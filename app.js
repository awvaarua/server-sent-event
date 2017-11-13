var express = require('express');
var helmet = require('helmet');
var https = require('https');
var fs = require('fs');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, custom_auth");
  next();
});

app.use(helmet());

app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send('up');
});

/*
//	To validate certification - For https Test...
app.get('/.well-known/acme-challenge/QVLCinHX6u3fEIx_VOuhUSRh_0KLJ5HtG23AdpzqNrE', function(req, res) {
  res.sendFile('./data', { root: __dirname });
});
*/

app.locals.connections = [];

require('./app/routes')(app);

// Lo ideal sería usar https para que la session que nos envían en la cabecera viajase encryptada
/*
https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/noty-system.tk/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/noty-system.tk/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/noty-system.tk/chain.pem')
}, app).listen(443);
*/

app.listen(3000, function() {
  console.log('Listening on port 3000..')
});
