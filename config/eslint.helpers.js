const fs = require("fs");

const getHeaderPath = () => {
  const primaryHeaderPath = "./config/header.js";
  const alternativeHeaderPath = "../../config/header.js";
  return fs.existsSync(primaryHeaderPath) ? primaryHeaderPath : alternativeHeaderPath;
};

module.exports = getHeaderPath;