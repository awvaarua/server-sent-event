var request = require("request");
module.exports = {

  isSessionIsValid: function (session, callback) {
    var options = {
      method: 'GET',
      url: 'http://api.back.logitravel.com/session/api/session/' + session
    };
    request(options, function (error, response, body) {
      var bodyObj = JSON.parse(body);
      if (error || !bodyObj || !bodyObj.Session || !bodyObj.Session.Id) return callback(false);
      return callback(true);
    });

  }
};
