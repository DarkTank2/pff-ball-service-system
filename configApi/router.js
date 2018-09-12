/*
 * @file router.js
 * This script defines and coordinates the /api routes of the application.
 * 
 * @author Alexander Semeliker
 * @date 09.02.2018
 * 
 * @copyright Copyright (C) Siemens AG 2018 All Rights Reserved.
 *
 */

"use strict";

var router = require("express").Router(); //initiate Router
var path = require("path");
var env = require("../env");
const req = require('request');
const fs = require('fs'); //  a File System Module, needed to count config-files of each assetType
const dir = './api';      //  folder-directory of all config files


/**
 * @author Philipp Stiller
 * This function is used to document/debug all the request which are received by the mockserver.
 * We need this functionality because we are always delivering the same response and would not be able to check the correctness.
 * 
 * @param {any} request 
 */
function logGETParameters(request) {
  console.log(request.query);
};

/**
 * /config
 * @author Alexander Seiler
 * @date 12.09.2018
 * This route delivers the configs of the app
 */
router.get("/config", function (request, response, next) {
  // logging outputs
  console.log("/api/config");
  logGETParameters(request);

  // Create empty config, which will be filled and returned later
  var config = {};
  config.configurations = []

  var arrayOfFiles = fs.readdirSync("./configApi/configs");
  arrayOfFiles.forEach(function (file) {
    config.configurations.push(require("./configs/" + file ));
  });

  response.status(200).json(config);
 
});

module.exports = router;