/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
const { exec, log } = require("./utils");

// Folders to remove
const FOLDERS_TO_REMOVE = [
  "dist",
  "build",
  "node_modules",
  "tsconfig.tsbuildinfo",
];

// Removes all node_modules, dist and build folders
const main = () => {
  const pathsToRemove = FOLDERS_TO_REMOVE.join(" ");

  const script = `rimraf ${pathsToRemove}`;

  log(script);
  exec(script);
};

main();
