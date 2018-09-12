/*--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 * @file logservice.js
 * This is a wrapper for bunyan including a store for all the created loggers. (So we can reuse loggers)
 *
 * @author Alexander Seiler
 * @date 12.09.2018
 * 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--*/
var APPNAME = "Service-Tool"; //TODO: get this information from the server
APPNAME += ": ";  //modify the prefix
var bunyan = require('bunyan');
var loggers = {}; //this array will hold all the instances of the loggers => each instance of the component will use the same logger

export default {
  create: function (name) {
    if (loggers[name] == undefined) { //check if logger for this name does not exist
      //TODO: get the loglevel from the browservariables!
      loggers[name] = bunyan.createLogger({name: APPNAME + name, level: 'debug'});  //create the logger and store it in the array
    }
    return loggers[name];
  }
}