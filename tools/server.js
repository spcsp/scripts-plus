const morgan = require("morgan");
const express = require("express");
const app = express();

const handleRequest = (req, res) => {
  res.json(req.body);
};

app.use(morgan("dev"));
app.use(express.json());
app.post("/", handleRequest);

const server = app.listen(process.env.PORT || 3000, () => {  
  console.log('Example app listening at http://localhost:%s', server.address().port);
});
