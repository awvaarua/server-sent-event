var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ a: 1 }));
});

app.locals.connections = [];
require('./app/routes')(app);

app.listen(3000, function() {
  console.log('Listening on port 3000...')
});
