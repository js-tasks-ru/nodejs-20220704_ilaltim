const LimitSizeStream = require("./LimitSizeStream");
const fs = require("fs");

const limitedStream = new LimitSizeStream({
  limit: 8,
  encoding: "utf-8"
});

const outStream = fs.createWriteStream("out.txt");

limitedStream.pipe(outStream);

limitedStream.write("hello");

setTimeout(() => {
  limitedStream.write("world");
}, 10);
limitedStream.on("error", (e) => {
  console.log("error ocured");
});
