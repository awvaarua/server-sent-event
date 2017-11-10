module.exports = function (req, res, next) {
  res.sseSetup = function() {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': 'http://dev.back.logitravel.com', //  Domain from origin request http://back.logitravel.com
      'Access-Control-Expose-Headers': '*',
      'Access-Control-Allow-Credentials': true
    })
  }
  res.sseSend = function(data) {
    res.write("data: " + JSON.stringify(data) + "\n\n");
  }
  next();
}
