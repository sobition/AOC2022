const split = (str, index) => {
  const result = [str.slice(0, index), str.slice(index)];

  return result;
};

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const part1 = (allFileContents) => {
  let sum = 0;
  allFileContents.split(/\r?\n/).forEach((backpack) => {
    const [first, second] = split(backpack, backpack.length / 2);
    let sharedItem;
    first.split("").map((letter) => {
      if (second.includes(letter)) sharedItem = letter;
    });
    sum += alphabet.indexOf(sharedItem) + 1;
  });

  console.log("sum: ", sum);
};
const part2 = (allFileContents) => {
  const group = [];
  const allGroups = [];
  allFileContents.split(/\r?\n/).forEach((backpack) => {
    group.push(backpack);
    if (group.length === 3) {
      allGroups.push([...group]);
      group.length = 0;
    }
  });
  let sumOfBadges = 0;
  allGroups.forEach((group) => {
    let sharedItem = "";
    const [first, second, third] = group;
    first.split("").map((letter) => {
      if (second.includes(letter) && third.includes(letter))
        sharedItem = letter;
    });
    sumOfBadges += alphabet.indexOf(sharedItem) + 1;
  });

  console.log("badges: ", sumOfBadges);
};

(() => {
  const fs = require("fs");
  const allFileContents = fs.readFileSync("./input.txt", "utf-8");
  part1(allFileContents);
  part2(allFileContents);
})();
