const morgan = require("morgan");
const express = require("express");
const app = express();
const { version } = require("../package.json");

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ "ScriptsPlus API Server": `v${version}` });
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.post("/echo", (req, res) => {
  res.json(req.body);
});

const server = app.listen(process.env.PORT || 3000, () => {  
  console.log('Example app listening at http://localhost:%s', server.address().port);
});
