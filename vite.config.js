import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

const root = "src";
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
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src", "partials"),
    }),
  ],
});
