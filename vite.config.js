import { resolve } from "path";
import { defineConfig } from "vite";
import vitePluginPug from "./plugins/vite-plugin-pug";

const root = "src"
export default defineConfig({
  root: resolve(__dirname, root),
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        main: resolve(__dirname, root, "index.pug"),
        "threejs-raycaster": resolve(
          __dirname,
          root,
          "code/threejs-raycaster/index.pug"
        ),
        "donut-selector": resolve(
          __dirname,
          root,
          "code/donut-selector/index.pug"
        ),
      },
    },
  },
  plugins: [
    vitePluginPug({
      basedir: resolve(__dirname, root),
    }),
  ],
});
