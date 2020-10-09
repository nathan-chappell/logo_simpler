const http = require("http");
const fs = require("fs");

const port = process.env.PORT || 7777;
const hostname = process.env.HOSTNAME || 'localhost';

const server = http.createServer((req, res) => {
  res.write(fs.readFileSync("./index.html"));
  res.end();
});

server.on("listening", () => console.log(`server listening at ${hostname}:${port}`));
server.listen(port);
