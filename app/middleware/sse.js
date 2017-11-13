module.exports = {

  startStream: function (req, res, next) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Expose-Headers': '*'
    });
    next();
  },

  addSseAction: function (req, res, next) {
    res.sseSend = function(data) {
      res.write("data: " + JSON.stringify(data) + "\n\n");
    };
    next();
  },

  addSocketClose: function (req, res, next) {
    res.socket.on('close', function () {
      var pos = req.app.locals.connections.indexOf(res);
      if (pos > -1) req.app.locals.connections.splice(pos, 1);
      res.end();
    });
    next();
  }

};
