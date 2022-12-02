(() => {
  const fs = require("fs");
  const allFileContents = fs.readFileSync("./input.txt", "utf-8");

  const RPC = {
    A: "rock",
    X: "rock",
    B: "paper",
    Y: "paper",
    C: "scissors",
    Z: "scissors",
  };
  const POINTS = {
    rock: 1,
    paper: 2,
    scissors: 3,
    lose: 0,
    draw: 3,
    win: 6,
  };

  let pointsCount = 0;
  let pointsWithStrategy = 0;

  const winCases = ["YA", "ZB", "XC"];
  const drawCases = ["XA", "YB", "ZC"];
  const loseCases = ["ZA", "XB", "YC"];

  allFileContents.split(/\r?\n/).forEach((line) => {
    const [player, you] = line.split(" ");
    //------------- PART 1 ------------------//
    pointsCount += POINTS[RPC[you]];
    if (winCases.includes(you + player)) pointsCount += POINTS.win;
    if (drawCases.includes(you + player)) pointsCount += POINTS.draw;
    if (loseCases.includes(you + player)) pointsCount += POINTS.lose;

    //------------- PART 2 ------------------//

    if (you === "X") {
      if (player === "A") {
        pointsWithStrategy += POINTS.scissors;
      } else if (player === "B") {
        pointsWithStrategy += POINTS.rock;
      } else if (player === "C") {
        pointsWithStrategy += POINTS.paper;
      }
      pointsWithStrategy += POINTS.lose;
    } else if (you === "Y") {
      pointsWithStrategy += POINTS[RPC[player]] + POINTS.draw;
    } else if (you === "Z") {
      if (player === "A") {
        pointsWithStrategy += POINTS.paper;
      } else if (player === "B") {
        pointsWithStrategy += POINTS.scissors;
      } else if (player === "C") {
        pointsWithStrategy += POINTS.rock;
      }
      pointsWithStrategy += POINTS.win;
    }
  });
  console.log("Points: ", pointsCount);
  console.log("Points with strategy: ", pointsWithStrategy);
})();
