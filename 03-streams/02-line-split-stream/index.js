const LineSplitStream = require("./LineSplitStream");
const fs = require("fs");
const os = require("os");

const lines = new LineSplitStream({ encoding: "utf-8", delimiter: `${os.EOL}` });

function onData(line) {
  console.log(line);
}

lines.on("data", onData);

lines.write(`первая строка${os.EOL}вторая строка${os.EOL}третья строка`);

lines.end();
