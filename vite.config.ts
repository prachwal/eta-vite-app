import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(
  readFileSync(resolve(__dirname, "package.json"), "utf-8")
);

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: "dist",
  },
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
});
