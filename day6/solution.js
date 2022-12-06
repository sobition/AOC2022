const hasDuplicates = (array) => {
  var valuesSoFar = Object.create(null);
  for (var i = 0; i < array.length; ++i) {
    var value = array[i];
    if (value in valuesSoFar) {
      return true;
    }
    valuesSoFar[value] = true;
  }
  return false;
};
const startFinder = (string, len) => {
  let result = 0;
  string.split(/\r?\n/).forEach((line) => {
    for (let i = 0; i < line.length - len; i++) {
      let subset = line.slice(i, i + len);
      if (!hasDuplicates(subset)) {
        result = i + len;
        return;
      }
    }
  });
  return result;
};
(() => {
  const fs = require("fs");
  const allFileContents = fs.readFileSync("./input.txt", "utf-8");

  let startOfPacketMarker = startFinder(allFileContents, 4);
  let startOfMessageMarker = startFinder(allFileContents, 14);
  console.log("startOfPacketMarker: ", startOfPacketMarker);
  console.log("startOfMessageMarker: ", startOfMessageMarker);
})();
