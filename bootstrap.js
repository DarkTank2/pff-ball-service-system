'use strict';

var express = require('express');
var path = require('path');
var env = require("./env");

var app = express();
app.use('/appinformation', function (request, response, next) {
  var body = "<h1>" + env.getAppname() + " appinformation</h1><hr />";
  body += "Versions: " + JSON.stringify(process.versions) + "<hr />";
  response.status(200).send(body);
})
// bootstrap web server for static resources
var staticFolder = 'resources'; // define folder for static resources
app.use(require("./itemsApi/router"));  //if we are running locally we are using some mocked APIs to be independent from Mindsphere
app.use('/api', require("./configApi/router"));
app.use('/libs', require("./librouter"));
app.use('/', express.static(path.join(staticFolder, 'index.html')));
app.use(express.static(staticFolder));

module.exports = function () {
  return app;
};