import { resolve } from "path";
import { defineConfig } from "vite";
import {render} from "pug"
import vitePluginPug from "./plugins/vite-plugin-pug";
import vitePluginGa from "./plugins/vite-plugin-ga";

const escapeHtml = (string) => {
  return string.replace(/[&'`"<>]/g, (match) => {
    return {
      '&': '&amp;',
      "'": '&#x27;',
      '`': '&#x60;',
      '"': '&quot;',
      '<': '&lt;',
      '>': '&gt;',
    }[match]
  });
}
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
      pretty: true,
      filters : {
        'code-html':  (text) => {
          const rendered = render(text, {pretty: true});
          return escapeHtml(rendered).trim();
        }
      }
    }),
    vitePluginGa("G-5QEMC1D1CN"),
  ],
});
