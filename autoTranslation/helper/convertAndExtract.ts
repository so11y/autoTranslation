import { CacheContext } from "../cache";

export function hasChinese(str: string) {
  const chineseRegex = /[\u4e00-\u9fa5]+/g;
  return chineseRegex.test(str);
}

export function convertChineseToStringTemplate(
  str: string,
  per = "",
  inner = true
) {
  const chineseRegex = /[\u4e00-\u9fa5]+/g;
  let result = str.replace(chineseRegex, (match) => {
    return "${" + per + "$t('" + CacheContext.getByContent(match) + "')}";
  });

  if (inner) {
    return result;
  }

  // 第二步：补充处理多个 $t() 表达式组合的情况
  // 使用非贪婪匹配，确保只匹配最内层的引号对
  const multiPatterns = [
    /"([^"]*?\$\{[^}]*?\$t\([^)]+\)[^}]*?\}[^"]*)"/g,
    /'([^']*?\$\{[^}]*?\$t\([^)]+\)[^}]*?\}[^']*)'/g
  ];

  // 多次处理确保所有都被处理
  let changed;
  do {
    changed = false;
    multiPatterns.forEach((pattern) => {
      result = result.replace(pattern, (match, content) => {
        changed = true;
        return "`" + content + "`";
      });
    });
  } while (changed);

  return result;
}

export function convertChineseToTemplate(str: string) {
  const chineseRegex = /[\u4e00-\u9fa5]+/g;
  return str.replace(chineseRegex, (match) => {
    return "{{$t('" + CacheContext.getByContent(match) + "')}}";
  });
}

export function extractChineseSegments(text: string) {
  // 匹配连续的中文字符
  const chineseRegex = /[\u4e00-\u9fa5]+/g;
  return text.match(chineseRegex) || [];
}
