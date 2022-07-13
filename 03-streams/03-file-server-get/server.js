const url = require("url");
const http = require("http");
const path = require("path");
const fs = require("fs");

const server = new http.Server();

server.on("request", (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname.slice(1);
  const filepath = path.join(__dirname, "files", pathname);

  if (pathname.split("/").length > 1) {
    res.statusCode = 400;
    res.end("nested folders are unsuported");
    //* if there is no such a file
  }

  const stream = fs.createReadStream(filepath);

  switch (req.method) {
    case "GET":
      stream.pipe(res);

      stream.on("error", (e) => {
        //*if user try to get file from nested folders
        if (e.code === "ENOENT") {
          res.statusCode = 404;
          res.end("file not found");
          //*other errors
        } else {
          res.statusCode = 500;
          res.end();
        }
      });
      //*if connection is lost - close stream
      req.on("aborted", () => {
        stream.destroy();
      });

      break;

    default:
      res.statusCode = 501;
      res.end("Not implemented");
  }
});

module.exports = server;
