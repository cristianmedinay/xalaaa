var fs = require('fs');
const packageJsonPath = "../package.json";
const newVersion = process.argv[2];
const packageJson = require(packageJsonPath);

if (newVersion === packageJson["version"]) {
  console.log(`Version ${newVersion} already exists`);
  process.exit(1);
}

if (newVersion) {
  packageJson["version"] = newVersion;
  console.log(`Applying version ${packageJson["version"]}`);
} else {
  const [major, minor, patch] = packageJson["version"].split(".").map(num => parseInt(num));
  packageJson["version"] = [major, minor, patch + 1].join(".");
  console.log(`Autobumping version to ${packageJson["version"]}`);
}

fs.writeFile(packageJsonPath, JSON.stringify(packageJson, 0, 4), function (err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});