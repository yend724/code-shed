import { vitePluginPugBuild } from "./vite-plugin-pug-build";
import { vitePluginPugServe } from "./vite-plugin-pug-serve";
import type { Options } from "pug";

const vitePluginPug = (options: Options = {}, locals: any) => {
  return [vitePluginPugBuild(options, locals), vitePluginPugServe(options, locals)];
};
export default vitePluginPug;
