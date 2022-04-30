import { vitePluginGaBuild } from "./vite-plugin-ga-build";
const vitePluginGa = (id:string) => {
  return [vitePluginGaBuild(id)];
};
export default vitePluginGa;