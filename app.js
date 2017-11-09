var express = require('express')
  , app = express()
  , sse = require('./sse')

var connections = []
  , votes = {yes: 0, no: 0}

app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.use(sse)

app.get('/', function(req, res) {
  res.render('vote')
})

app.get('/result', function(req, res) {
  res.render('result')
})

app.get('/vote', function(req, res) {
  if (req.query.yes === "true") votes.yes++
  else votes.no++

  for(var i = 0; i < connections.length; i++) {
    connections[i].sseSend(votes)
  }
  res.sendStatus(200)
})

function removeConnection(connection) {

}

app.get('/stream', function(req, res) {
  res.sseSetup();
  res.sseSend(votes);
  //console.log(res.socket._id);
  res.socket.on('close', function () {
    console.log("Connection closed");
    var pos = connections.indexOf(res);
    if (pos > -1) connections.splice(pos, 1);
    res.end();
  });
  connections.push(res)
  console.log(connections.length);
})

app.listen(3000, function() {
  console.log('Listening on port 3000...')
})
