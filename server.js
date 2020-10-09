const http = require("http");
const fs = require("fs");

const port = process.env.PORT || 7777;
const hostname = process.env.HOSTNAME || 'localhost';

const server = http.createServer((req, res) => {
  if (req.url === '/dist/index.js') {
    res.write(fs.readFileSync('./dist/index.js'));
  } else if (req.url === '/dist/index.js.map') {
    res.write(fs.readFileSync('./dist/index.js.map'));
  } else {
    res.write(fs.readFileSync("./index.html"));
  }
  res.end();
});

server.on("listening", () => console.log(`server listening at ${hostname}:${port}`));
server.listen(port);
