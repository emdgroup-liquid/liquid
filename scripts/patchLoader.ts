/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");
const packageJSON = require("../dist/loader/package.json");
const patchedPackageJSON = {
  ...packageJSON,
  main: packageJSON.main.replace(".cjs", ".es2017"),
  type: "module",
};
fs.writeFileSync(
  "./dist/loader/package.json",
  JSON.stringify(patchedPackageJSON, null, 2),
);
