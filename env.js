'use strict';

var cfenv = require("cfenv"); //cfenv gives us the possibility to determine where we are running and to load the environment variables

var environment, config;  //variables used in this module
/* ===> AUTORUN <=== */

console.log("App is running local. environment-variables will be loaded via js-yaml.");
var fs = require('fs'); //we need to load the fs module to read a file from the filesystem
var yaml = require('js-yaml');  //this module will parse our yml-file
environment = yaml.safeLoad(fs.readFileSync('manifest.yml', 'utf8')).applications[0]; //load navigate in the file

config = JSON.parse(environment.env.CONFIG);
/* ===> !AUTORUN <=== */

/**
 * This function looks for available ports to start the application. If none is available through the process variables it will use a fallback.
 * 
 * @returns 
 */
function getPort() {
  var usedPort = null;
  if (process.env.PORT) {
    usedPort = process.env.PORT;
  } else if (process.env.VCAP_APP_PORT) {
    usedPort = process.env.VCAP_APP_PORT;
  }
  return usedPort || 3000;
}

/**
 * This function extracts the name from the loaded environment-variables.
 * 
 * @returns the name of the app
 */
function getAppname() {
  return environment.name; //dont know if called
}

/**
 * This function extracts a specific variable from the CONFIG object from the loaded environment-variables.
 * 
 * @returns 
 */
function getManifestvariable(variableName) {
  return config[variableName]; //dont know if called
}

module.exports = {
  getPort: getPort,
  getAppname: getAppname,
  isLocal: cfenv.getAppEnv().isLocal,
  getManifestvariable: getManifestvariable
}