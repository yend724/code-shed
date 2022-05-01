import fs from "fs";
import { send } from "vite";
import type { ViteDevServer, Plugin } from "vite";
import { compileFile, Options } from "pug";

const transformPugToHtml = (
  server: ViteDevServer,
  path: string,
  options: Options,
  locals:any
) => {
  let compliled: string = ""
  try {
    const relativePath = path.split("/src")[1].replace("index.pug", "")
    const { pages } = locals;
    const current = pages.filter((page)=>{
      if(page.path === relativePath) {
        return {
          ...page
        }
      }
    })

    console.log(current)

    compliled = compileFile(path, options)({
      current: {
        ...current[0]
      },
      ...locals,
    });
    console.log("pug compile success")
  }catch (error){
    console.error(error)
    compliled = "Pug Error"
  }

  return server.transformIndexHtml(path, compliled);
};

export const vitePluginPugServe = (options: Options, locals:any): Plugin => {
  return {
    name: "vite-plugin-pug-serve",
    enforce: "pre",
    apply: "serve",
    handleHotUpdate(context) {
      context.server.ws.send({
        type: "full-reload",
      });
      return [];
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const root = server.config.root;
        let fullReqPath = root + req.url;

        if (fullReqPath.endsWith("/")) {
          fullReqPath += "index.html";
        }

        if (fullReqPath.endsWith(".html")) {
          if (fs.existsSync(fullReqPath)) {
            return next();
          }

          const pugPath = `${
            fullReqPath.slice(0, Math.max(0, fullReqPath.lastIndexOf("."))) ||
            fullReqPath
          }.pug`;
          if (!fs.existsSync(pugPath)) {
            return send(req, res, "404 Not Found", "html", {});
          }

          const html = await transformPugToHtml(server, pugPath, options, locals);
          return send(req, res, html, "html", {});
        } else {
          return next();
        }
      });
    },
  };
};
