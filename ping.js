const http = require('http');

const data = JSON.stringify({
  name: 'John Doe'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/__scripts_plus',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
    let data = '';

    console.log('Status Code:', res.statusCode);

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
      console.log('Body: ', JSON.parse(data));
    });

}).on("error", (err) => {
    console.log("Error: ", err.message);
});

req.write(data);
req.end();