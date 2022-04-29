import fs from "fs";
import type { Plugin } from "vite";
import { compileFile, Options } from "pug";

export const vitePluginPugBuild = (options: Options): Plugin => {
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
          const html = compileFile(pathMap[id], options)();
          return html;
        }
        return fs.readFileSync(id, "utf-8");
      }
    },
  };
};
