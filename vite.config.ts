import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import autoTranslation from "./autoTranslation/index";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    autoTranslation({
      agent: {
        // Ollama 本地服务配置
        url: "http://127.0.0.1:11434/api/generate", // Ollama 默认端口
        mode: "gemma3:1b" // 替换为你实际使用的模型名称
      }
    })
  ]
});
