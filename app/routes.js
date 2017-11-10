module.exports = function(app) {
    var sseMd = require('./middleware/sse');

    var streamController = require('./controllers/stream');
    app.get('/stream', sseMd.startStream, sseMd.addSseAction, sseMd.addSocketClose, streamController.init);

    var eventController = require('./controllers/event');
    app.get('/event/:actionName', eventController.event);
}
