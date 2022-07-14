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

  switch (req.method) {
    case "DELETE":
      fs.unlink(filepath, (err, result) => {
        if (err) {
          if (err.code === "ENOENT") {
            res.statusCode = 404;
            res.end();
            console.log("file not found");
          }
        } else {
          res.statusCode = 200;
          res.end();
          console.log("file deleted");
        }
      });

      break;

    default:
      res.statusCode = 501;
      res.end("Not implemented");
  }
});

module.exports = server;
