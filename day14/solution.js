const getLines = (lines) => {
  const map = new Set();
  let maxY = 0;

  for (const line of lines) {
    const points = line.split(" -> ").map((point) => {
      const [x, y] = point.split(",").map(Number);
      if (y > maxY) {
        maxY = y;
      }
      return { x, y };
    });

    let current = points.shift();
    while (points.length) {
      let target = points.shift();

      while (current.x !== target.x || current.y !== target.y) {
        map.add(`${current.x},${current.y}`);
        if (current.x !== target.x) {
          const delta = (target.x - current.x) / Math.abs(target.x - current.x);
          current.x += delta;
        } else {
          const delta = (target.y - current.y) / Math.abs(target.y - current.y);
          current.y += delta;
        }
      }
      map.add(`${current.x},${current.y}`);
    }
  }

  return { map, maxY };
};

const part1 = ({ map, maxY }) => {
  let dropIntoEndlessVoid = false;
  let sandsCount = 0;
  while (!dropIntoEndlessVoid) {
    let { x, y } = { x: 500, y: 0 };
    sandsCount++;

    while (!dropIntoEndlessVoid) {
      if (!map.has(`${x},${y + 1}`)) {
        y++;
      } else if (!map.has(`${x - 1},${y + 1}`)) {
        y++;
        x--;
      } else if (!map.has(`${x + 1},${y + 1}`)) {
        y++;
        x++;
      } else {
        map.add(`${x},${y}`);
        break;
      }
      if (y >= maxY) {
        dropIntoEndlessVoid = true;
        sandsCount--;
      }
    }
  }
  console.log("part1:", sandsCount);
};

const part2 = ({ map, maxY }) => {
  let sandCount = 0;
  while (true) {
    if (map.has(`500,0`)) {
      break;
    }
    let { x, y } = { x: 500, y: 0 };
    sandCount++;

    while (true) {
      if (y === maxY + 1) {
        map.add(`${x},${y}`);
        break;
      } else if (!map.has(`${x},${y + 1}`)) {
        y++;
      } else if (!map.has(`${x - 1},${y + 1}`)) {
        y++;
        x--;
      } else if (!map.has(`${x + 1},${y + 1}`)) {
        y++;
        x++;
      } else {
        map.add(`${x},${y}`);
        break;
      }
    }
  }

  console.log("part2:", sandCount);
};
(() => {
  const fs = require("fs");

  const lines = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");
  part1(getLines(lines));
  part2(getLines(lines));
})();
