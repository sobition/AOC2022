const parsePairs = (pairs) => {
  const [first, second] = pairs.split(",");
  const [firstS, firstE] = first.split("-");
  const [secondS, secondE] = second.split("-");

  return [
    Array(firstE - firstS + 1)
      .fill(0)
      .map((_, i) => Number(firstS) + i),
    Array(secondE - secondS + 1)
      .fill(0)
      .map((_, i) => Number(secondS) + i),
  ];
};

(() => {
  const fs = require("fs");
  const allFileContents = fs.readFileSync("./test.txt", "utf-8");
  let completeOverlapCounter = 0;
  let counter = 0;
  allFileContents.split(/\r?\n/).forEach((pairs) => {
    const [first, second] = parsePairs(pairs);
    
      const fullyCovers =
      first.every((val) => second.includes(val)) ||
      second.every((val) => first.includes(val));

    if (fullyCovers) {
      completeOverlapCounter += 1;
    }

    const filteredArray = first.filter((value) => second.includes(value));
    if (filteredArray.length > 0) {
      counter += 1;
    }
  });

  console.log("completeOverlapCounter: ", completeOverlapCounter);
  console.log("counter: ", counter);
})();
