import axios from "axios";
import { CacheContext } from "./cache";

export async function translateText(chineseText: string) {
  try {
    const response = await axios.post(CacheContext.agent.url, {
      model: CacheContext.agent.mode,
      prompt: `请将以下中文翻译成英文，只返回英文翻译结果，不要任何其他内容或标点符号：${chineseText}`,
      stream: false,
      options: {
        temperature: 0.3 // 降低随机性以获得更确定性的结果
      }
    });

    const englishText = response.data.response.replace(/[^\w\s]/g, "").trim(); // 移除首尾空格

    return englishText;
  } catch (error: any) {
    console.error("翻译请求失败:", error.message);
    throw new Error("翻译服务暂不可用");
  }
}
