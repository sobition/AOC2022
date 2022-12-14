const getNeighbors = (current, mapDimension) => {
  const [x, y] = current;
  const offsets = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];
  const points = offsets.map(([dx, dy]) => [x + dx, y + dy]);
  return points.filter(
    (point) =>
      point.every((x) => x >= 0) &&
      point[0] < mapDimension[0] &&
      point[1] < mapDimension[1]
  );
};

const parseMap = (input) => {
  const elevations = "abcdefghijklmnopqrstuvwxyz";

  let start = [0, 0];
  let target = [0, 0];
  const mapDimension = [input.length, input[0].length];
  const elevMap = Array(mapDimension[0])
    .fill(0)
    .map((_) => new Array(mapDimension[1]));
  input.forEach((row, x) => {
    row.split("").forEach((square, y) => {
      if (square === "S") {
        start = [x, y];
        elevMap[x][y] = elevations.indexOf("a");
      } else if (square === "E") {
        target = [x, y];
        elevMap[x][y] = elevations.indexOf("z");
      } else {
        elevMap[x][y] = elevations.indexOf(square);
      }
    });
  });
  return { start, target, mapDimension, elevMap };
};

const part2 = (input) => {
  const { _, target, mapDimension, elevMap } = parseMap(input);
  let queue = [[target, 0]];
  const visited = new Set();
  const stepsArr = [];
  while (queue.length) {
    const [currentPoint, steps] = queue.shift();
    if (visited.has(currentPoint.toString())) {
      continue;
    }
    visited.add(currentPoint.toString());
    if (elevMap[currentPoint[0]][currentPoint[1]] === 0) {
      stepsArr.push(steps);
    }
    const neighbors = getNeighbors(currentPoint, mapDimension);
    const possiblePaths = neighbors.filter(
      (point) =>
        elevMap[point[0]][point[1]] >=
        elevMap[currentPoint[0]][currentPoint[1]] - 1
    );
    queue = queue.concat(possiblePaths.map((point) => [point, steps + 1]));
  }
  console.log("part2:", Math.min(...stepsArr));
};

const part1 = (input) => {
  const { start, target, mapDimension, elevMap } = parseMap(input);
  let queue = [[start, 0]];
  const visited = new Set();

  while (queue.length) {
    const [currentPoint, steps] = queue.shift();
    if (visited.has(currentPoint.toString())) {
      continue;
    }
    visited.add(currentPoint.toString());
    if (currentPoint.toString() === target.toString()) {
      console.log("part1:", steps);
    }

    const neighbors = getNeighbors(currentPoint, mapDimension);
    const possiblePaths = neighbors.filter(
      (point) =>
        elevMap[point[0]][point[1]] <=
        elevMap[currentPoint[0]][currentPoint[1]] + 1
    );
    queue = queue.concat(possiblePaths.map((point) => [point, steps + 1]));
  }
};

(() => {
  const fs = require("fs");

  const allFileContents = fs.readFileSync("./input.txt", "utf-8").split("\n");
  part1(allFileContents);
  part2(allFileContents);
})();
