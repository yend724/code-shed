import fs from "fs";
import type { Plugin } from "vite";
import { compileFile, Options } from "pug";

export const vitePluginPugBuild = (options: Options, locals: any): Plugin => {
  const pathMap: Record<string, string> = {};
  return {
    name: "vite-plugin-pug-build",
    enforce: "pre",
    apply: "build",
    resolveId(source: string) {
      if (source.endsWith(".pug")) {
        const dummy = `${
          source.slice(0, Math.max(0, source.lastIndexOf("."))) || source
        }.html`;
        pathMap[dummy] = source;
        return dummy;
      }
    },
    load(id: string) {
      if (id.endsWith(".html")) {
        if (pathMap[id]) {
          const relativePath = id.split("/src")[1];
          const { pages } = locals;
          const current = pages.filter((page)=>{
            if(page.path === relativePath) {
              return {
                path: relativePath,
                ...page
              }
            }
          })

          const html = compileFile(
            pathMap[id],
            options
          )({
            current: {
              ...current[0]
            },
            ...locals,
          });

          return html;
        }
        return fs.readFileSync(id, "utf-8");
      }
    },
  };
};
