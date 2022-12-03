const split = (str, index) => {
  const result = [str.slice(0, index), str.slice(index)];

  return result;
};

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
(() => {
  const fs = require("fs");
  const allFileContents = fs.readFileSync("./input.txt", "utf-8");
  // -------------- part 1 --------------
  const sharedItems = [];
  const sum = [];
  allFileContents.split(/\r?\n/).forEach((backpack) => {
    const [first, second] = split(backpack, backpack.length / 2);
    let sharedItem;
    for (let i = 0; i < first.length; i++) {
      for (let j = 0; j < second.length; j++) {
        if (first[i] === second[j]) {
          sharedItem = first[i];
        }
      }
    }
    sharedItems.push(sharedItem);
  });

  sum.push(sharedItems.reduce((a, b) => a + alphabet.indexOf(b) + 1, 0));

  console.log("sum: ", ...sum);
  // -------------- part 2 --------------

  const group = [];
  const allGroups = [];
  allFileContents.split(/\r?\n/).forEach((backpack) => {
    group.push(backpack);
    if (group.length === 3) {
      allGroups.push([...group]);
      group.length = 0;
    }
  });
  const badges = [];
  allGroups.forEach((group) => {
    let sharedItem = "";
    const [first, second, third] = group;
    for (let k = 0; k < first.length; k++) {
      for (let i = 0; i < second.length; i++) {
        for (let j = 0; j < third.length; j++) {
          if (first[k] === second[i]) {
            if (first[k] === third[j]) {
              sharedItem = first[k];
            }
          }
        }
      }
    }
    badges.push(sharedItem);
  });

  console.log(
    "badges: ",
    badges.reduce((a, b) => a + alphabet.indexOf(b) + 1, 0)
  );
})();
