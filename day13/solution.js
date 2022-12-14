const compareArrays = (left, right) => {
  let i = 0;
  while (i < left.length && i < right.length) {
    if (Number.isInteger(left[i]) && Number.isInteger(right[i])) {
      if (left[i] == right[i]) {
        i++;
      } else {
        return left[i] - right[i];
      }
    } else {
      const recRes = compareArrays([left[i]].flat(), [right[i]].flat());
      if (recRes == 0) {
        i++;
      } else {
        return recRes;
      }
    }
  }
  return left.length - right.length;
};

const part1 = (signals) => {
  let sum = 0;

  signals.forEach((signal, index) => {
    const [left, right] = signal.split("\n").map((s) => JSON.parse(s));
    const result = compareArrays(left, right);

    if (result < 0) {
      sum += index + 1;
    }
  });

  console.log("part1:", sum);
};

const part2 = (signals) => {
  const sn = signals
    .split("\n")
    .map((s) => JSON.parse(s))
    .concat([[[2]], [[6]]]);
  sn.sort((a, b) => {
    return compareArrays(a, b) > 0 ? 1 : -1;
  });
  const indices = [];
  sn.map((s, index) => {
    if (JSON.stringify(s) === "[[2]]" || JSON.stringify(s) === "[[6]]")
      indices.push(index + 1);
  });
  console.log("part2:", indices[0] * indices[1]);
};
(() => {
  const fs = require("fs");
  const signals = fs.readFileSync("./input.txt", "utf-8");
  part1(signals.split("\n\n"));
  part2(signals.replace(/\n\n/g, "\n"));
})();
