module.exports = {
  init: function (req, res, next) {
    req.app.locals.connections.push(res);
  }
}
