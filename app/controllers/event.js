module.exports = {
  event: function (req, res, next) {
    var action = req.params.actionName;
    var params = req.query;
    for(var i = 0; i < req.app.locals.connections.length; i++) {
      req.app.locals.connections[i].sseSend({action, params});
    }
    res.sendStatus(200);
  }
}
