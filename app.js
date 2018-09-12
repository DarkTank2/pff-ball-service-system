'use strict';

var app = require('./bootstrap.js');
var env = require('./env.js');

var port = env.getPort();
app().listen(port, function () {
    console.log('App is now listening to port ' + port);
});

process.on('uncaughtException', function (err) {
    console.log(err.message, err.stack);
});