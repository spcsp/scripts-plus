const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev')); // log requests to the console
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/__scripts_plus', (_req, res) => {
	res.json({ message: 'hooray! welcome to our api!' });	
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});