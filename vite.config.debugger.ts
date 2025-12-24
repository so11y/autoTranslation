import { createServer } from "vite";
import config from "./vite.config";

try {
  const server = await createServer({
    ...config,
    configFile: false,
    root: process.cwd()
  });

  await server.listen();
  server.printUrls();
  // 处理退出
  process.on("SIGTERM", () => server.close());
} catch (error) {
  console.error("❌ 启动失败:", error);
  process.exit(1);
}
