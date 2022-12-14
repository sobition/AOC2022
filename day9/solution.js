const tailIsTooFar = (head, tail) => {
  return Math.abs(head[0] - tail[0]) > 1 || Math.abs(head[1] - tail[1]) > 1;
};

const createSteps = (input) => {
  return input
    .split("\n")
    .map((s) => {
      const [dir, steps] = s.split(" ");
      return [dir, parseInt(steps)];
    })
    .reduce((acc, [dir, steps]) => {
      for (let i = 0; i < steps; i++) {
        acc.push(dir);
      }
      return acc;
    }, []);
};

const moveHead = (head, direction) => {
  switch (direction) {
    case "R":
      head[1] += 1;
      break;
    case "L":
      head[1] -= 1;
      break;
    case "U":
      head[0] += 1;
      break;
    case "D":
      head[0] -= 1;
      break;
  }
  return head;
};

const moveTail = (head, tail) => {
  const [tailX, tailY] = tail;
  const [headX, headY] = head;
  let nTail = tail;
  if (tailX === headX) {
    nTail[1] = tail[1] + (head[1] - tail[1] > 0 ? 1 : -1);
  } else if (tailY === headY) {
    nTail[0] = tail[0] + (head[0] - tail[0] > 0 ? 1 : -1);
  } else {
    nTail[1] = tail[1] + (head[1] - tail[1] > 0 ? 1 : -1);
    nTail[0] = tail[0] + (head[0] - tail[0] > 0 ? 1 : -1);
  }
  return nTail;
};

const saveMark = (marks, tail) => {
  marks[tail[0]] = marks[tail[0]] || {};
  marks[tail[0]][tail[1]] = true;
  return marks;
};

const part1 = (steps) => {
  const head = [0, 0];
  const tail = [0, 0];
  const tailMarks = {};
  const [, , marksOntheRope] = steps.reduce(
    ([head, tail, marks], step) => {
      const nHead = moveHead(head, step);
      let nTail = tail;
      if (tailIsTooFar(nHead, tail)) {
        nTail = moveTail(nHead, tail);
      }
      return [nHead, nTail, saveMark(marks, nTail)];
    },
    [head, tail, tailMarks]
  );

  const totalMarks = Object.keys(marksOntheRope).reduce(
    (sum, i) => sum + Object.keys(marksOntheRope[i]).length,
    0
  );

  console.log("Part1: ", totalMarks);
};

const part2 = (steps) => {
  const head = [0, 0];
  const tailMarks = {};
  const [, , marksOntheRope] = steps.reduce(
    ([rope, marks], step) => {
      rope[0] = moveHead(rope[0], step);
      // for each knot
      for (let i = 1; i < rope.length; i++) {
        if (tailIsTooFar(rope[i - 1], rope[i])) {
          rope[i] = moveTail(rope[i - 1], rope[i]);
        }
      }
      return [rope, saveMark(marks, rope[rope.length - 1])];
    },
    [
      [
        head,
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
      tailMarks,
    ]
  );

  const totalMarks = Object.keys(marksOntheRope).reduce(
    (sum, x) => sum + Object.keys(marksOntheRope[x]).length,
    0
  );
  console.log("part2:", totalMarks);
};
(() => {
  const fs = require("fs");

  const allFileContents = fs.readFileSync("./input.txt", "utf-8");

  const steps = createSteps(allFileContents);
  part1(steps);
  part2(steps);
})();
