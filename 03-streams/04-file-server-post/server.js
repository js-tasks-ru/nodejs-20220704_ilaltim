const url = require("url");
const http = require("http");
const path = require("path");
const fs = require("fs");
const LimitSizeStream = require("./LimitSizeStream");
const stream = new LimitSizeStream({ limit: 1024 });
const server = new http.Server();
const FILE_LIMIT = 1356472;
server.on("request", (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);
  const filepath = path.join(__dirname, "files", pathname);
  try {
    if (fs.existsSync(filepath)) {
      res.statusCode = 409;
      res.end("file already exist");
      return;
      //file exists
    }
  } catch (error) {
    console.log(error);
  }

  if (pathname.split("/").length > 1) {
    res.statusCode = 400;
    res.end("nested folders are unsuported");
  }

  switch (req.method) {
    case "POST":
      let data = "";
      let dataSize = 0;
      req.on("data", (chunk) => {
        data += chunk;
        if (dataSize > FILE_LIMIT) {
          res.statusCode = 413;
          res.end("too big to go");
          return;
        }
        dataSize += +chunk.length;
      });
      req.on("end", () => {
        if (!data) {
          console.log("empty body");
          res.end();
          return;
        } else if (dataSize > FILE_LIMIT) {
          res.statusCode = 413;
          res.end("too big to go");
          return;
        } else {
          fs.writeFile(filepath, data, (err) => {
            if (err) {
              return console.log("file was not saved :", err);
            }
            if (dataSize > FILE_LIMIT) {
              res.statusCode = 413;
              res.end("too big to go");
              return;
            }
            res.statusCode = 201;
            res.end();

            console.log("The file was saved! with file size : ", dataSize);
          });
        }
      });

      break;

    default:
      res.statusCode = 501;
      res.end("Not implemented");
  }
});

module.exports = server;
