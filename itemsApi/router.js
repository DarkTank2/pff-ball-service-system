"use strict";

var router = require("express").Router(); //initiate Router

/**
 * This function is used to document/debug all the request which are received by the mockserver.
 * We need this functionality because we are always delivering the same response and would not be able to check the correctness.
 * 
 * @param {any} request 
 */
function logGETParameters(request) {
  console.log(request.query);
}

/**
 * This route delivers the timeseries of an aspect of a single asset.
 */
router.get("/Items", function (request, response, next) {
  logGETParameters(request);
  var itemsConfig = require("./items.json");
  response.status(200).json(itemsConfig);
});

module.exports = router;