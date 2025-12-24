import { outputFile } from "fs-extra";
import { debounce } from "lodash-es";
import { resolve } from "path";
import { pathToFileURL } from "url";
import { translateText } from "./ai";
import { PromiseWithResolvers } from "./helper";
import { hasChinese } from "./helper/convertAndExtract";

type UseKey = {
  translate: () => void;
};

export type AgentOption = {
  url: string;
  mode: string;
};

export const CacheContext = {
  awaitTranslate: Promise.resolve(),
  files: {},
  hasUseKey: {} as Record<string, UseKey>,
  ignore: {},
  zh: {},
  en: {},
  agent: null as AgentOption,
  async ready(id: string, content: string) {
    if (hasChinese(content)) {
      const ready = PromiseWithResolvers();
      CacheContext.awaitTranslate = CacheContext.awaitTranslate.then<any>(
        async () => ready.promise
      );
      this.files[id] = {
        id,
        ready
      };
      return {
        hasChinese: true,
        drop: async (v: any) => {
          await this.outputFile();
          this.files[id].ready.resolve();
          return v;
        }
      };
    }
    return {
      hasChinese: false
    };
  },
  getByContent(content: string) {
    const hasIgnore = this.ignore[content];
    if (hasIgnore) {
      return content;
    }
    this.hasUseKey[content] = {
      hasTranslate: false,
      translate: async () => {
        if (this.hasUseKey[content]?.hasTranslate) {
          return;
        }
        try {
          if (!this.zh[content]) {
            this.zh[content] = content;
          }
          if (!this.en[content]) {
            this.en[content] = await translateText(content);
          }
        } catch (error) {
          console.error(`[${content}]：翻译失败`, error);
        } finally {
          this.hasUseKey[content].hasTranslate = true;
        }
      }
    };
    return content;
  },
  coverToFile() {
    const hasUseKey = Object.keys(this.hasUseKey); //.map((v) => this._i18_81i_[v]);
    const zh = Object.fromEntries(hasUseKey.map((v) => [v, this.zh[v]]));
    const en = Object.fromEntries(hasUseKey.map((v) => [v, this.en[v]]));
    return {
      zh: `export default ${JSON.stringify(zh, null, 4)}`,
      en: `export default ${JSON.stringify(en, null, 4)}`
    };
  },
  outputFile: debounce(async function () {
    await Promise.allSettled(
      Object.values(this.hasUseKey).map((v: UseKey) => v.translate())
    );
    const { zh, en } = this.coverToFile();
    await Promise.allSettled([
      outputFile("./_i18_81i_/zh.js", zh),
      outputFile("./_i18_81i_/en.js", en)
    ]);

    outputFile(
      "./_i18_81i_/__cache__.mjs",
      `export default ${JSON.stringify(
        {
          zh: this.zh,
          en: this.en,
          ignore: this.ignore
        },
        null,
        4
      )}`
    );
  }, 300),
  async initCache(options: { agent: AgentOption }) {
    this.agent = options.agent;
    const cacheFile = await import(
      pathToFileURL(resolve(process.cwd(), "./_i18_81i_/__cache__.mjs")).href
    );
    this.zh = cacheFile.default.zh || {};
    this.en = cacheFile.default.en || {};
    this.ignore = cacheFile.default.ignore || {};

    // await this.outputFile(true);
  }
};
