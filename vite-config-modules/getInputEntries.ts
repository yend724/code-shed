import fg from "fast-glob";
import { resolve } from "path";
export const getInputEntries = () => {
  const pugs = fg.sync(["**/src/**/*.pug"], {
    ignore: ["**/src/pug-modules/**"],
  });
  const entries = pugs.reduce((acc, cur) => {
    acc[cur.split(".pug")[0].replace(/\//g, "-")] = resolve(
      __dirname,
      "../",
      cur
    );
    return acc;
  }, {});

  return entries;
};
