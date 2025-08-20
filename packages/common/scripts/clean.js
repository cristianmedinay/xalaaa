/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
const { exec, log } = require("./_helpers");

// All folders to remove
const FOLDERS_TO_REMOVE = [
  "dist",
  "build",
  "node_modules",
  "tsconfig.tsbuildinfo",
];

const toPathModel = (path) => `${path} packages/**/${path}`;

// Removes all node_modules, dist and build folders, and cleans yarn cache
const main = () => {
  const pathsToRemove = FOLDERS_TO_REMOVE.map(toPathModel).join(" ");

  const script = `rimraf ${pathsToRemove}`;

  log(script);
  exec(script);
};

main();
