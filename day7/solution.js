(() => {
  const fs = require("fs");
  const dirs = { "/": 0 };
  const current = [];
  const allFileContents = fs.readFileSync("./input.txt", "utf-8");
  allFileContents.split(/\r?\n/).forEach((line) => {
    if (line.includes("$")) {
      let command = line.split(" ")[1];
      let arg = line.split(" ")[2];
      switch (command) {
        case "cd":
          if (arg === "..") {
            current.pop();
          } else {
            current.push(arg);
          }
          break;
      }
    } else {
      let file = line.split(" ");
      if (file[0] === "dir") {
        const directory = file[1];
        dirs[(current.join("/") + `/${directory}`).slice(1)] = 0;
      } else {
        current.forEach((dir, index) => {
          if (dir === "/") {
            dirs["/"] += Number(line.split(" ")[0]);
          }
          const newPath = current
            .slice(0, index + 1)
            .join("/")
            .slice(1);
          if (newPath) dirs[newPath] += Number(line.split(" ")[0]);
        });
      }
    }
  });

  const Part1 = (dirs) => {
    let result = 0;
    Object.values(dirs).forEach((dir) => {
      if (dir <= 100000) {
        result += dir;
      }
    });

    console.log("Part1: ", result);
  };
  Part1(dirs);

  const Part2 = (dirs) => {
    const DiskSpace = 70000000;
    let freeSpace = DiskSpace - dirs["/"];
    let target = 30000000 - freeSpace;
    const availableOpts = [];
    Object.values(dirs).forEach((dir) => {
      if (dir > target) availableOpts.push(dir);
    });
    console.log("Part2: ", Math.min(...availableOpts));
  };
  Part2(dirs);
})();
