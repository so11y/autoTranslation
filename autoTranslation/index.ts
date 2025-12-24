import { parse as vueParse, babelParse, MagicString } from "@vue/compiler-sfc";
import { createFilter, Plugin, ResolvedConfig } from "vite";
import { AgentOption, CacheContext } from "./cache";
import { transformText } from "./transform/transformJs";
import { debounce } from "lodash-es";
import { basename, extname } from "path";

export default function (options: { agent: AgentOption }): Plugin[] {
  const jsFilter = createFilter(/\.(js|ts|tsx|vue)$/, /node_modules|_i18_81i_/);
  const i18FileFilter = createFilter(
    /\/_i18_81i_\/([^/]*)(\.js)?$/,
    /node_modules/
  );

  let config: ResolvedConfig;
  const selfMode = {};
  const writeI18File = debounce(
    async () => await CacheContext.outputFile(),
    500
  );

  return [
    {
      name: "vite-auto-translation-i18",
      transform: {
        order: "post",
        async handler(code, id) {
          if (!jsFilter(id)) {
            return;
          }
          const { hasChinese, drop } = await CacheContext.ready(id, code);
          if (!hasChinese) {
            return;
          }
          const ast = babelParse(code, {
            sourceType: "module"
          });
          if (!ast) {
            return;
          }
          return drop(transformText(ast, "window."));
        }
      }
    },
    // {
    //   name: "vite-transform-vueI18",
    //   transform: {
    //     order: "pre",
    //     async handler(code, id) {
    //       if (!vueFilter(id)) {
    //         return;
    //       }
    //       const { hasChinese, drop } = await CacheContext.ready(id, code);
    //       if (!hasChinese) {
    //         return;
    //       }
    //       const { descriptor } = vueParse(code);
    //       if (!descriptor) {
    //         return;
    //       }
    //       return drop(transformVue(descriptor.template.ast, code));
    //     }
    //   }
    // },
    {
      name: "vite-auto-translation-build",
      configResolved(_config) {
        config = _config;
      },
      config() {
        return {
          esbuild: {
            charset: "utf8"
          }
        };
      },
      async buildStart() {
        await CacheContext.initCache(options);
      },
      resolveId: {
        order: "pre",
        async handler(id) {
          if (i18FileFilter(id)) {
            if (config.mode === "production") {
              const name = basename(id);
              const fileName = `${name}.js`;
              const referenceId = this.emitFile({
                type: "asset",
                name: `${name}.js`
              });
              const resolveId = `${referenceId}_${fileName}`;
              selfMode[`/${resolveId}`] = {
                referenceId,
                exportName: name.replace(extname(name), "")
              };
              return {
                id: `/${resolveId}`,
                external: "absolute"
              };
            }
          }
        }
      },
      async renderStart() {
        await CacheContext.awaitTranslate;
        writeI18File();
        const cover = CacheContext.coverToFile();
        Object.keys(selfMode).forEach((id) => {
          const { exportName, referenceId } = selfMode[id];
          this.setAssetSource(referenceId, cover[exportName]);
        });
      },
      renderChunk(_code, chunk) {
        const modules = chunk.imports.filter((id) => selfMode[id]);
        if (modules.length) {
          const code = new MagicString(_code);
          modules.forEach((id) => {
            const fileName = this.getFileName(selfMode[id].referenceId);
            code.replace(id, `/${fileName}`);
          });
          return code.toString();
        }
      }
    }
  ];
}
