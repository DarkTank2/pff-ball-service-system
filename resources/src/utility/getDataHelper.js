/**--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 * @file getterHelper.js
 * This file contains functions that are used to communicate with the server.
 *
 * @author Alexander Seiler
 * @date 12.09.2018
 * 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~--*/
import logservice from '../services/logservice.js';
var logger = logservice.create("getDataHelper.js");  //initialize the logger with the name of the component

require("babel-polyfill");
var Vue = require('vue');
Vue.use(require('vue-resource'));

export default {
  /**
   * getData
   * @author Alexander Seiler
   * @date 12.09.2018
   * This function returns a http.get promise for the specified path
   */
  getData: function (url) {
    return Vue.http.get(url, function (response) {
      logger.debug("getData(" + url + ") succeeded");
      return response;
    }).catch(function (error) {
      logger.debug("getData(" + error + ")");
    });
  }
}