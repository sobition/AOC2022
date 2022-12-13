const getOperation = (operation) => {
  return (old) => {
    const string = operation.replace(/old/, old);
    return eval(string);
  };
};

const part1 = (monkeys) => {
  for (let i = 0; i < 20; i++) {
    for (monkey of monkeys) {
      let { items } = monkey;
      while (items.length) {
        let item = items.shift();
        monkey.totalInspectedObjects++;
        item = monkey.operation(item);
        item = Math.floor(item / 3);
        const destination = monkey.sendTo(item);
        monkeys[destination].items.push(item);
      }
    }
  }

  const activity = monkeys.map((m) => m.totalInspectedObjects);

  activity.sort((a, b) => b - a);
  console.log("Part1: ", activity[0] * activity[1]);
};

const part2 = (monkeys) => {
  const divider = monkeys.map((m) => m.divisibleBy).reduce((a, b) => a * b, 1);

  for (let i = 0; i < 10000; i++) {
    for (monkey of monkeys) {
      let { items } = monkey;
      while (items.length) {
        let item = items.shift();
        monkey.totalInspectedObjects++;
        item = monkey.operation(item);
        item = item % divider;
        const destination = monkey.sendTo(item);
        monkeys[destination].items.push(item);
      }
    }
  }
  const activity = monkeys.map((m) => m.totalInspectedObjects);

  activity.sort((a, b) => b - a);
  console.log("Part2: ", activity[0] * activity[1]);
};

const createMonkeys = (input) => {
  const monkeys = [];
  input.split("\n\n").forEach((monkey, monkeyId) => {
    const monkeyObj = { id: monkeyId, totalInspectedObjects: 0 };
    monkey.split("\n").forEach((line) => {
      const [key, value] = line.split(":");
      if (key.trim() === "Starting items") {
        monkeyObj.items = value
          .trim()
          .split(",")
          .map((item) => Number(item.trim()));
      }
      if (key.trim() === "Operation") {
        monkeyObj.operation = getOperation(value.split("= ")[1]);
      }
      if (key.trim() === "Test") {
        monkeyObj.divisibleBy = Number(value.split("by ")[1]);
      }

      if (line.includes("If true")) {
        monkeyObj.whenTrue = Number(value.split("monkey ")[1]);
      }
      if (line.includes("If false")) {
        monkeyObj.whenFalse = Number(value.split("monkey ")[1]);
      }
      monkeyObj.sendTo = (item) =>
        item % monkeyObj.divisibleBy === 0
          ? monkeyObj.whenTrue
          : monkeyObj.whenFalse;
    });
    monkeys.push(monkeyObj);
  });

  return monkeys;
};

(() => {
  const fs = require("fs");
  const allFileContents = fs.readFileSync("./input.txt", "utf-8");

  part1(createMonkeys(allFileContents));
  part2(createMonkeys(allFileContents));
})();
