const moveCrates = (line, crates, isBulk = false) => {
  let number = Number(line.split(" ")[1]);
  let fromStack = crates[Number(line.split(" ")[3]) - 1];
  let toStack = crates[Number(line.split(" ")[5]) - 1];

  if (line !== "") {
    if (!isBulk) {
      for (let i = 0; i < number; i++) {
        toStack.unshift(fromStack.shift());
      }
    } else {
      let subset = fromStack.splice(0, number);
      toStack.unshift(...subset);
    }
  }

  return crates;
};

(() => {
  const fs = require("fs");
  const allFileContents = fs.readFileSync("./input.txt", "utf-8");
  let stacks = [...Array(9)].map(() => []);
  let Ans1 = [];
  let Ans2 = [];
  let lastItems1 = "";
  let lastItems2 = "";
  allFileContents.split(/\r?\n/).forEach((line) => {
    if (!line.includes("move") && line !== "") {
      line.match(/.{1,4}/g).forEach((item, index) => {
        if (item.trim() !== "" && /^([1-9])$/.test(item.trim()) === false) {
          stacks[index].push(item.trim().replace("[", "").replace("]", ""));
        }
      });
    } else {
      //   Ans1 = moveCrates(line, stacks);
      Ans2 = moveCrates(line, stacks, true);
    }
  });
  Ans1.forEach((stack) => {
    lastItems1 += stack[0];
  });
  Ans2.forEach((stack) => {
    lastItems2 += stack[0];
  });

  console.log(
    "Answer1: ",
    Ans1.reduce((acc, stack) => acc + stack[0], "")
  );
  console.log(
    "Answer2: ",
    Ans2.reduce((acc, stack) => acc + stack[0], "")
  );
})();
