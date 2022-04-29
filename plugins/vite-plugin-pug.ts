import { vitePluginPugBuild } from "./vite-plugin-pug-build";
import { vitePluginPugServe } from "./vite-plugin-pug-serve";
import type { Options } from "pug";

const vitePluginPug = (options: Options = {}) => {
  return [vitePluginPugBuild(options), vitePluginPugServe(options)];
};
export default vitePluginPug;
