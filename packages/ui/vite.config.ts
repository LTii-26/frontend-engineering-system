import { fileURLToPath, URL } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";


export default defineConfig({
  plugins: [react(), tailwindcss()],
  // 构建配置
  build: {
    // 构建成一个库 library
    lib: {
      entry: fileURLToPath(new URL("./src/index.ts", import.meta.url)),
      formats: ["es"],
      fileName: "index",
      cssFileName: "styles",
    },
    // rollup 的配置选项
    rollupOptions: {
      // 排除：数组里面所对应的依赖，不打包到库里面
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
  },
})
