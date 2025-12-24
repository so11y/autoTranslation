# Vite Plugin — Auto I18n（精简易用说明）

## 简介

自动将项目中的中文文本替换为 i18n 调用并生成翻译文件。支持 Vue 和 React（模板、脚本、JSX、模板字符串均覆盖）。适用于开发时自动提取与生产构建时生成语言包。

## 安装

```bash
# 从 GitHub
npm install -D github:https://github.com/so11y/autoTranslation

```

## 快速开始

1. 在 vite.config.js 中启用插件

```js
// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import autoTranslation from "vite-plugin-auto-i18n";

export default defineConfig({
  plugins: [
    vue(),
    autoTranslation({
      agent: {
        mode: "ollama", // 'ollama' | 'openai' | 'custom'
        url: "http://127.0.0.1:11434/api/generate",
        model: "gemma3:1b"
      }
    })
  ]
});
```

2. 创建并挂载 i18n（以 vue-i18n 为例）

```js
// src/i18n.js
import { createI18n } from "vue-i18n";
import zh from "../_i18_81i_/zh";
import en from "../_i18_81i_/en";

const i18n = createI18n({
  legacy: false,
  locale: "zh",
  fallbackLocale: "en",
  messages: { en, zh }
});

// 必须挂载到 window.$t，插件在源码中生成的调用依赖此函数
window.$t = (key) => i18n.global.t(key);

export { i18n };
```

3. 在入口文件中使用

```js
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import { i18n } from "./i18n";

createApp(App).use(i18n).mount("#app");
```

## 主要功能

- 自动替换源码中的中文为 $t('中文原文')（模板、script、JSX、字符串字面量）。
- 自动生成语言包目录 `_i18_81i_/`：
  - `zh.js`（中文原文映射）
  - `en.js`（英文翻译）
  - `__cache__.mjs`（缓存）
- 开发模式支持热更新；生产构建生成最终翻译文件。

## 配置项（常用）

```js
autoTranslation({

  agent: {
    url: "http://localhost:11434/api/generate",
    model: "gemma3:1b"
});
```

## Agent 示例

- Ollama

```js
agent: {
  url: 'http://127.0.0.1:11434/api/generate',
  mode: 'qwen2.5:7b'
}
```

## 支持的文件类型

- .vue（模板 + script）
- .js / .ts
- .jsx / .tsx
- 模板字符串与 JSX 内文本

## 转换示例

- 转换前

```vue
<template>
  <div>{{ "你好世界" }}</div>
  <button @click="showMessage('操作成功')">确认</button>
</template>

<script setup>
console.log("欢迎使用");
</script>
```

- 转换后

```vue
<template>
  <div>{{ $t("你好世界") }}</div>
  <button @click="showMessage($t('操作成功'))">确认</button>
</template>

<script setup>
console.log($t("欢迎使用"));
</script>
```

## 项目结构（插件生成）

```
your-project/
├─ src/
│  ├─ App.vue
│  ├─ main.js
│  └─ i18n.js
├─ _i18_81i_/        # 自动生成（不要手动修改）
│  ├─ zh.js
│  ├─ en.js
│  └─ __cache__.mjs
├─ vite.config.js
└─ package.json
```

## 注意与最佳实践

- 必须在应用初始化前挂载 `window.$t`，否则运行时会报错。
- 将不需要翻译的文件通过 `exclude` 配置排除，避免误替换。
- 检查构建产物中是否包含所需语言包（生产构建时生成）。

## 常见问题与排查

- 翻译未生效：
  - 确认 `window.$t` 已挂载；
  - 查看控制台错误；
  - 确认 `_i18_81i_/` 目录存在且包含语言文件。
- Ollama 连接失败：
  - 确认 Ollama 服务已启动：`ollama serve`；
  - 检查模型是否可用：`ollama list`；
  - 验证端口与 URL 是否正确（默认 11434）。
- HMR 不工作：
  - 确认 `_i18_81i_/` 更新时 Vite 热更新被触发；
  - 检查 `exclude` 是否误排除了需要监听的文件。

## 开发与运行

```bash
npm install
npm run dev        # 开发模式（监听）
npm run build      # 生产构建
npm run example:vue
```

## 许可证与贡献

- 许可证：MIT
- 欢迎通过 Issue 或 PR 反馈问题与提交改进。

## 一句话说明

自动把源码中的中文替换为 i18n 调用并生成语言包，支持 Ollama / OpenAI 作为翻译后端。
