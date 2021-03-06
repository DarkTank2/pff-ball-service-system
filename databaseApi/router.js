"use strict";

var router = require("express").Router(); //initiate Router
var bodyParser = require('body-parser');
var buffer = require("./buffer.js");
var userLogin = require("./loginData.json");
var pug = require('pug');

const loginSucceeded = pug.compileFile('./resources/pugs/master.pug');
const loginFailed = pug.compileFile('./resources/pugs/waiter.pug');
const oneOrder = pug.compileFile('./resources/pugs/oneCollapsible.pug');

var masterLoggedIn = false;

var retObject = {
  baseurl: "http://localhost:4000",
  items: [
    {
      name: "Sushi",
      image: "/img/sushi.jpg",
      price: "3,40€"
    },
    {
      name: "Schweinsbraten",
      image: "/img/schweinsbraten.jpg",
      price: "5,-"
    },
    {
      name: "Knödel",
      image: "/img/schweinsbraten.jpg",
      price: "18,-"
    }
  ]
}

var orderObject = {
  baseurl: "http://localhost:4000",
  orders: {
    food: [
      {
        index: "1020",
        table: "12"
      },
      {
        index: "1010",
        table: "13"
      },
      {
        index: "1021",
        table: "10"
      }
    ],
    drinks: [
      {
        index: "100",
        table: "12"
      },
      {
        index: "200",
        table: "13"
      },
      {
        index: "300",
        table: "10"
      }
    ]
  }
}

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

function getFirstOrder(tableName) {
  return new Promise(function(resolve, reject) {
    buffer.getAllFromTable(tableName).then(function(orders) {
      if(orders.length > 0)
      {
        var firstOrder = JSON.parse(orders[0].value);
        var orderIndex = firstOrder.orderIndex;
        buffer.deleteOrderByIndex(tableName, orderIndex).then(function() {
          resolve(firstOrder);
        },
        function(err) {
          reject({response: {error: err, message: "Fehler beim löschen der Bestellung mit der Nummer: " + orderIndex}});
        });
      }
      else{
        resolve({});
      }
    },
    function(err) {
      reject({response: {error: err, message: "Fehler beim holen alle Bestellungen aus der Datenbank für Essen!"}});
    });
  });
}

/**
 * This route delivers the timeseries of an aspect of a single asset.
 */
router.get("/master", function (request, response, next) {
  logGETParameters(request);
  var data = getURLData(request.originalUrl);
  console.log(data.username);
  console.log(data.password);
  if(data.username == userLogin.username && data.password == userLogin.password/* && masterLoggedIn == false*/)
  {
    masterLoggedIn = true;
    var retval = loginSucceeded(orderObject);
    response.status(200).send(retval);
  }
  else{
    response.status(404).send(loginFailed(retObject));
  }
});

router.get("/storeOrder", function(request, response, next) {
  logGETParameters(request);
  var data = getURLData(request.originalUrl);
  var orderIndex = buffer.getOrderIndex();
  if(data.food != undefined)
  {
    var orderFood = data.food;
    orderFood.orderIndex = orderIndex;
    buffer.storeData("orderFood", orderFood);
  }
  if(data.drinks != undefined)
  {
    var orderDrinks = data.drinks;
    orderDrinks.orderIndex = orderIndex;
    buffer.storeData("orderDrinks", orderDrinks);
  }
  response.status(200).json({response: orderIndex});
});

router.get("/getFirstOrderFood", function(request, response, next) {
  logGETParameters(request);
  var data = request.originalUrl.split("?")[1];
  var parameterPais = data.split("&");
  var dataObj = {};
  for(var i = 0; i < parameterPais.length; ++i)
  {
    dataObj[parameterPais[i].split("=")[0]] = parameterPais[i].split("=")[1];
  }
  getFirstOrder("orderFood").then(function(data) {
    var retData = oneOrder({order:{table: "10", index: "1234"}, icon: "local_dining", index: dataObj.index, type: "trash"});
    response.status(200).send(retData);
  },
  function(err) {
    response.status(404).json(err);
  });
});

router.get("/getFirstOrderDrinks", function(request, response, next) {
  logGETParameters(request);
  getFirstOrder("orderDrinks").then(function(data) {
    response.status(200).json(data);
  },
  function(err) {
    response.status(404).json(err);
  });
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
    response.status(404).json({response: {error: err, message: "Es ist ein Fehler in der Rechnungs-Datenbank aufgetreten!\nWende dich bitte an das Buffet-Team."}});
  });
});

module.exports = router;