var apiSession = require('../infrastructure/api-session');
module.exports = {

  check: function (req, res, next) {
    var session = req.headers.custom_auth;
    if (typeof session !== 'string' || session === '') return res.status(401).send('');

    apiSession.isSessionIsValid(session, function (isValid) {
      if (isValid === true) {
        next();
      } else {
        return res.status(401).send('');
      }
    });
  }

};
