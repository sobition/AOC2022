const fs = require("fs");

const maxCalories = () => {
  let sums = [];
  let backpacker = [];
  const allFileContents = fs.readFileSync("./input.txt", "utf-8");
  allFileContents.split(/\r?\n/).forEach((line) => {
    let calories = Number(line);
    backpacker.push(calories);

    if (calories === 0) {
      sums.push(backpacker.reduce((a, b) => a + b, 0));
      backpacker = [];
    }
  });
  sums.sort((a, b) => b - a);
  let sumOfThree = sums.slice(0, 3);

  console.log("Max: ", Math.max(...sums));
  console.log(
    "Sum of Three: ",
    sumOfThree.reduce((a, b) => a + b, 0)
  );
};
maxCalories();
