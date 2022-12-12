const createSteps = (input) => {
  let steps = [];
  input.split(/\r?\n/).forEach((line, index) => {
    const [command, value] = line.split(" ");
    if (command === "addx") {
      steps.push("addx?0");
      steps.push(`addx?${value}`);
    } else if (command === "noop") {
      steps.push("noop");
    }
  });

  return steps;
};

const draw = (drawing) => {
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += drawing[i].join("");
    result += "\n";
  }
  return result;
};

const Part1 = (steps) => {
  let strengthCycle = [20, 60, 100, 140, 180, 220];
  let cycle = 1;
  const signals = {};
  let X = 1;
  steps.forEach((step) => {
    if (strengthCycle.includes(cycle)) {
      signals[cycle] = X * cycle;
    }
    const [command, value] = step.split("?");
    if (command === "addx") {
      X = X + parseInt(value);
    }

    cycle++;
  });

  const sumOfSignals = Object.values(signals).reduce((a, b) => a + b, 0);
  console.log("part1: ", sumOfSignals);
};

const shouldDraw = (position, X) => position >= X - 1 && position <= X + 1;

const Part2 = (input) => {
  const commands = input.split("\n");
  const drawing = Array(6)
    .fill(null)
    .map(() => Array(40).fill("."));
  let X = 1;
  let cycle = 0;
  let currentRow = 0;
  for (const command of commands) {
    const [_, value] = command.split(" ");
    let row = drawing[currentRow];

    row[cycle % 40] = shouldDraw(cycle % 40, X) ? "█" : " ";
    cycle++;

    if (cycle % 40 === 0 && cycle > 0) {
      currentRow += 1;
    }

    if (command === "noop") continue;

    row = drawing[currentRow];
    row[cycle % 40] = shouldDraw(cycle % 40, X) ? "█" : " ";

    X += parseInt(value);

    cycle++;
    if (cycle % 40 === 0 && cycle > 0) {
      currentRow += 1;
    }
  }
  console.log(drawing.map((row) => row.join("")).join("\n"));
};
(() => {
  const fs = require("fs");
  const allFileContents = fs.readFileSync("./input.txt", "utf-8");

  const steps = createSteps(allFileContents);

  Part1(steps);
  Part2(allFileContents);
})();
