import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "autoTranslation/index.ts",
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: [
        "stream",
        "fs",
        "util",
        "path",
        /^node:/,
        /^@babel/,
        /^@vue/,
        "axios",
        "assert",
        "vite"
      ]
    }
  },
  plugins: [dts()]
});
