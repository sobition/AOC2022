const returnVisibles = (map) => {
  let visible = 0;
  let y = 0;
  let scores = [];
  while (y < map.length) {
    for (let x = 0; x < map[y].length; x++) {
      if (checkVisiblity(map, y, x)) {
        visible++;
      }
      scores.push(getScore(map, y, x));
    }
    y++;
  }
  console.log("visible", visible);
  console.log("Score", Math.max(...scores));
};

const checkVisiblity = (map, y, x) => {
  let vertSubArray = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (x === j) {
        vertSubArray.push(map[i][j]);
      }
    }
  }

  const [top, bottom, right, left] = getSideTrees(map, y, x);

  if (!top.length || !bottom.length || !left.length || !right.length) {
    return true;
  } else if (
    top.every((item) => item < map[y][x]) ||
    bottom.every((item) => item < map[y][x]) ||
    left.every((item) => item < map[y][x]) ||
    right.every((item) => item < map[y][x])
  ) {
    return true;
  }

  return false;
};

const getScore = (map, y, x) => {
  const [top, bottom, right, left] = getSideTrees(map, y, x);
  left.reverse();
  top.reverse();
  //   console.log("top", map[y][x], top, bottom, right, left);
  let current = map[y][x];
  let topScore = [],
    bottomScore = [],
    rightScore = [],
    leftScore = [];
  if (top.length) {
    for (let i = 0; i < top.length; i++) {
      if (top[i] >= current) {
        topScore.push(top[i]);
        break;
      } else {
        topScore.push(top[i]);
      }
    }
  }
  if (bottom.length) {
    for (let i = 0; i < bottom.length; i++) {
      if (bottom[i] >= current) {
        bottomScore.push(bottom[i]);
        break;
      } else {
        bottomScore.push(bottom[i]);
      }
    }
  }
  if (right.length) {
    for (let i = 0; i < right.length; i++) {
      if (right[i] >= current) {
        rightScore.push(right[i]);
        break;
      } else {
        rightScore.push(right[i]);
      }
    }
  }
  if (left) {
    for (let i = 0; i < left.length; i++) {
      if (left[i] >= current) {
        leftScore.push(left[i]);
        break;
      } else {
        leftScore.push(left[i]);
      }
    }
  }

  return [
    topScore.length,
    bottomScore.length,
    rightScore.length,
    leftScore.length,
  ].reduce((a, b) => a * b, 1);
};
const getSideTrees = (map, y, x) => {
  const vertSubArray = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (x === j) {
        vertSubArray.push(map[i][j]);
      }
    }
  }
  let treesFromtop = vertSubArray.slice(0, y);

  let treesFromBottom = vertSubArray.slice(y + 1, map.length);
  let treesFromLeft = map[y].slice(0, x);
  let treesFromRight = map[y].slice(x + 1, map[y].length);

  return [treesFromtop, treesFromBottom, treesFromRight, treesFromLeft];
};
(() => {
  const fs = require("fs");
  let map = [];
  const allFileContents = fs.readFileSync("./input.txt", "utf-8");
  allFileContents.split(/\r?\n/).forEach((line, index) => {
    map[index] = [];
    line.split("").forEach((char, charIndex) => {
      map[index][charIndex] = Number(char);
    });
  });
  returnVisibles(map);
})();
