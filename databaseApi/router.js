"use strict";

var router = require("express").Router(); //initiate Router
var bodyParser = require('body-parser');
var buffer = require("./buffer.js");
var userLogin = require("./loginData.json");

var masterLoggedIn = false;


router.use(bodyParser.urlencoded({ extended: false }));
console.log("Use databaseRouter");
buffer.initializeBuffer();
/**
 * This function is used to document/debug all the request which are received by the mockserver.
 * We need this functionality because we are always delivering the same response and would not be able to check the correctness.
 * 
 * @param {any} request 
 */
function logGETParameters(request) {
  console.log(request.query);
}

function getURLData(originalUrl)
{
  var extendedUrl = originalUrl.split("?")[1];
  var data = decodeURIComponent(extendedUrl);
  return JSON.parse(data);
}

/**
 * This route delivers the timeseries of an aspect of a single asset.
 */
router.get("/master", function (request, response, next) {
  logGETParameters(request);
  var data = getURLData(request.originalUrl);
  console.log(data.username);
  console.log(data.password);
  if(data.username == userLogin.username && data.password == userLogin.password && masterLoggedIn == false)
  {
    masterLoggedIn = true;
    response.status(200).json({response: "ok"});
  }
  else{
    response.status(404).json({response: "error"});
  }
});

router.get("/storeBillsFood", function(request, response, next) {
  logGETParameters(request);
  var data = getURLData(request.originalUrl);
  var orderID = buffer.getOrderIndex();
  data.orderID = orderID;
  buffer.storeBillsFood(data);
  response.status(200).json({response: "ok"});
});

router.get("/getAllBillsFood", function(request, response, next) {
  logGETParameters(request);
  buffer.getAllBillsFood().then(function(data) {
    response.status(200).json(data);
  }, function(err) {
    console.log(err);
    response.status(404).json({response: "not ok"})
  });
});

module.exports = router;