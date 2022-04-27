import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import { root, pageData } from "./src/data/data";

export default defineConfig({
  root: resolve(__dirname, root),
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        main: resolve(__dirname, root, "index.html"),
        "threejs-raycaster": resolve(
          __dirname,
          root,
          "code/threejs-raycaster/index.html"
        ),
        "donut-selector": resolve(
          __dirname,
          root,
          "code/donut-selector/index.html"
        ),
      },
    },
  },
  plugins: [
    handlebars({
      context(pagePath) {
        return {
          ...pageData[pagePath],
        };
      },
      partialDirectory: resolve(__dirname, "src", "partials"),
    }),
  ],
});
