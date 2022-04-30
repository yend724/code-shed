import type { Plugin } from "vite";

export const vitePluginGaBuild = (id:string): Plugin => {
  return {
    name: "vite-plugin-ga-build",
    enforce: "pre",
    apply: "build",
    transformIndexHtml(html) {
      return {
        html: html,
        tags: [
          {
            tag: "script",
            attrs: {"async": true, "src": `https://www.googletagmanager.com/gtag/js?id=${id}`},
            injectTo: "head"
          },
          {
          tag: "script",
          children: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag("js", new Date());
          gtag("config", "${id}");`,
          injectTo: "head"
        }]
      }
    },
  };
};
