// 最基本的 eslint 配置
import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist", "dist-ssr"]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
]);
