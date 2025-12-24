import { NodeTypes, RootNode, transform } from "@vue/compiler-core";
import { MagicString } from "@vue/compiler-sfc";
import { transformText } from "./transformJs";
import {
  convertChineseToStringTemplate,
  convertChineseToTemplate,
  hasChinese
} from "../helper/convertAndExtract";

export function transformVue(ast: RootNode, code: string) {
  const ms = new MagicString(code);
  transform(ast, {
    nodeTransforms: [
      function (node, context) {
        if (node.type === NodeTypes.ELEMENT) {
          node.props.forEach((prop) => {
            switch (prop.type) {
              case 6: {
                if (prop.value && hasChinese(prop.value.content)) {
                  const newText = convertChineseToStringTemplate(
                    prop.value.content
                  );
                  ms.overwrite(
                    prop.loc.start.offset,
                    prop.loc.end.offset,
                    `:${prop.name}="\`${newText}\`"`
                  );
                }
                break;
              }
              case 7: {
                if (prop.exp?.ast && hasChinese(prop.exp.loc.source)) {
                  const newText = transformText({
                    type: "Program",
                    body: [prop.exp.ast as any]
                  } as any);
                  if (newText) {
                    const offset = prop.exp.loc;
                    ms.overwrite(
                      offset.start.offset,
                      offset.end.offset,
                      newText
                    );
                  }
                }
              }
            }
          });
          return;
        }
        if (node.type === NodeTypes.TEXT && hasChinese(node.content)) {
          const text = convertChineseToTemplate(node.content);
          const offset = node.loc;
          ms.overwrite(offset.start.offset, offset.end.offset, text);
          return;
        }

        if (node.type === NodeTypes.INTERPOLATION && node.content.ast) {
          const newText = transformText({
            type: "Program",
            body: [node.content.ast as any]
          } as any);
          if (newText) {
            ms.overwrite(
              node.content.loc.start.offset,
              node.content.loc.end.offset,
              newText
            );
          }
        }
      }
    ]
  });
  return ms.toString();
}
