(() => {
  const fs = require("fs");

  const RPC = {
    A: "rock",
    B: "paper",
    C: "scissors",
  };
  const POINTS = {
    rock: 1,
    paper: 2,
    scissors: 3,
    lose: 0,
    draw: 3,
    win: 6,
  };

  const allFileContents = fs.readFileSync("./input.txt", "utf-8");

  let pointsCount = 0;
  let pointsWithStrategy = 0;

  const calculatePoints = (player1, player2) => {};
  allFileContents.split(/\r?\n/).forEach((line) => {
    const [player, you] = line.split(" ");
    //------------- PART 1 ------------------//
    if (player === "A") {
      if (you === "X") {
        pointsCount += POINTS.rock + POINTS.draw;
      } else if (you === "Y") {
        pointsCount += POINTS.paper + POINTS.win;
      } else if (you === "Z") {
        pointsCount += POINTS.scissors + POINTS.lose;
      }
    }
    if (player === "B") {
      if (you === "X") {
        pointsCount += POINTS.rock + POINTS.lose;
      } else if (you === "Y") {
        pointsCount += POINTS.paper + POINTS.draw;
      } else if (you === "Z") {
        pointsCount += POINTS.scissors + POINTS.win;
      }
    }
    if (player === "C") {
      if (you === "X") {
        pointsCount += POINTS.rock + POINTS.win;
      } else if (you === "Y") {
        pointsCount += POINTS.paper + POINTS.lose;
      } else if (you === "Z") {
        pointsCount += POINTS.scissors + POINTS.draw;
      }
    }

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
