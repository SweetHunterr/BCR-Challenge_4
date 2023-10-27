const http = require("http");
const PORT = 8080;
const path = require("path");
const fs = require("fs");

const PUBLIC_DIRECTORY = path.join(__dirname, "../public");

const getFileHTML = (fileNameHTML) => {
  const fileHTML = path.join(`./public/${fileNameHTML}`);
  return fs.readFileSync(fileHTML, "utf-8");
}

const onRequest = (req, res) => {
  switch (req.url) {
    case "/":
      res.writeHead(200, { "Context-Type": "text/html" });
      res.end(getFileHTML("index.html"));
      return
    case "/cars":
      res.writeHead(200, { "Context-Type": "text/html" });
      res.end(getFileHTML("cars.html"));
      return
    default:
      const filePath = path.join(PUBLIC_DIRECTORY, req.url);
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.end("File Not Found");
        } else {
          res.end(data);
        }
      })
  }
}

const server = http.createServer(onRequest);

server.listen(PORT, "localhost", () => {
  console.log("Server is Running In Port : ", PORT);
})