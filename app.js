var express = require('express');
var helmet = require('helmet');
var https = require('https');
var fs = require('fs');
var app = express();

app.use(helmet());

app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send('up');
});

/*
//	To certificate
app.get('/.well-known/acme-challenge/QVLCinHX6u3fEIx_VOuhUSRh_0KLJ5HtG23AdpzqNrE', function(req, res) {
  res.sendFile('./data', { root: __dirname });
});
*/

app.locals.connections = [];

require('./app/routes')(app);

https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/noty-system.tk/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/noty-system.tk/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/noty-system.tk/chain.pem')
}, app).listen(443);

/*
app.listen(80, function() {
  console.log('Listening on port 3000..')
});
*/
