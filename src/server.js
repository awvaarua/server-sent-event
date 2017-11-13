var express = require('express'); // Framework for web server
var helmet = require('helmet');   // Increase security
var https = require('https');     //  Https server for production
var fs = require('fs');           //  File system reader

var app = express();
app.use(helmet());

//  Allow CORS -> Cross domain
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, custom_auth");
  next();
});

//  Default route to check connection
app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send('up');
});

/*
//	Route to validate cert with -> letsencrypt
app.get('/.well-known/acme-challenge/QVLCinHX6u3fEIx_VOuhUSRh_0KLJ5HtG23AdpzqNrE', function(req, res) {
  res.sendFile('./data', { root: __dirname });
});
*/

//  Adding routes
require('./routes')(app);

//  Store all current subscibed connections to /stream
app.locals.connections = [];


/*
// Https server
https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/noty-system.tk/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/noty-system.tk/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/noty-system.tk/chain.pem')
}, app).listen(443);
*/

app.listen(3000, function() {
  console.log('Listening on port 3000..')
});
