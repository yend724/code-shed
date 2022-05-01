import { resolve } from "path";
import { defineConfig } from "vite";
import { render } from "pug";
import vitePluginPug from "./plugins/vite-plugin-pug";
import vitePluginGa from "./plugins/vite-plugin-ga";
import { escapeHtml } from "./vite-config-modules/escapeHtml";
import { getInputEntries } from "./vite-config-modules/getInputEntries";
import siteData from "./data/siteData.json";

const root = "src";
export default defineConfig({
  root: resolve(__dirname, root),
  build: {
    outDir: resolve(__dirname, "dist"),
    rollupOptions: {
      input: {
        ...getInputEntries(),
      },
    },
  },
  plugins: [
    vitePluginPug(
      {
        basedir: resolve(__dirname, root),
        pretty: true,
        filters: {
          "code-html": text => {
            const rendered = render(text, { pretty: true });
            return escapeHtml(rendered).trim();
          },
        },
      },
      siteData
    ),
    vitePluginGa("G-5QEMC1D1CN"),
  ],
});
