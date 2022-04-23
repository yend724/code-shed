import { defineConfig } from "vite";
import { resolve } from "path";

const root = 'src'
export default defineConfig({
  root: resolve(__dirname, root),
  base: "code-shed",
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        main: resolve(__dirname, root, "index.html"),
        "shed-sample": resolve(__dirname, root, "shed/sample/index.html"),
      },
    },
  },
});
