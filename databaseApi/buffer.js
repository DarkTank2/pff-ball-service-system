'use-strict'

var sqlite = require('sqlite3').verbose();
var moment = require('moment');

console.log("Buffer Started");

var database = undefined;
var orderIndex = 0;

function initializeBuffer()
{
    console.log("initializeBuffer()");
    database = new sqlite.Database(':memory:');
    database.run("CREATE TABLE orderFood (value real, timestamp char(8))");
    database.run("CREATE TABLE orderDrinks (value real, timestamp char(8))");
    database.run("CREATE TABLE billsFood (value real, timestamp char(8))");
    database.run("CREATE TABLE billsDrinks (value real, timestamp char(8))");
}

function getOrderIndex()
{
    console.log("getOrderIndex()");
    var retval = orderIndex;
    ++orderIndex;
    return retval;
}

function storeOrderFood(order)
{
    console.log("storeOrderFood( "+ JSON.stringify(order)+" )");
    var timestamp = moment();
    var db = database.prepare("INSERT INTO orderFood VALUES (?,?)");
    db.run(order, timestamp);
}

function storeOrderDrinks(order)
{
    console.log("storeOrderDrinks( "+ JSON.stringify(order)+" )");
    var timestamp = moment();
    var db = database.prepare("INSERT INTO orderDrinks VALUES (?,?)");
    db.run(order, timestamp);
}

function storeBillsFood(order)
{
    console.log("storeBillsFood( "+ JSON.stringify(order)+" )");
    var timestamp = moment().format();
    var db = database.prepare("INSERT INTO billsFood VALUES (?,?)");
    try{
        db.run(JSON.stringify(order), timestamp);
    }
    catch(err){
        console.log(err);
    }
}

function storeBillsDrinks(order)
{
    console.log("storeBillsDrinks( "+ JSON.stringify(order)+" )");
    var timestamp = moment();
    var db = database.prepare("INSERT INTO billsDrinks VALUES (?,?)");
    try{
        db.run(JSON.stringify(order), timestamp);
    }
    catch(err){
        console.log(err);
    }
    
}

function getAllBillsFood(){
    return new Promise(function(resolve, reject) {
        database.serialize(function(){
            var query = "SELECT * FROM billsFood";
            database.all(query, function(err, data) {
                if(err)
                {
                    reject("Read error: " + err.message);
                }
                else{
                    resolve(data);
                }
            });
        });
    });
}

function getFirstOrderFood(){

}

function getFirstOrderDrinks(){

}

module.exports = {
    initializeBuffer: initializeBuffer,
    storeBillsDrinks: storeBillsDrinks,
    storeBillsFood: storeBillsFood,
    storeOrderDrinks: storeOrderDrinks,
    storeOrderFood: storeOrderFood,
    getAllBillsFood: getAllBillsFood,
    getOrderIndex: getOrderIndex
}