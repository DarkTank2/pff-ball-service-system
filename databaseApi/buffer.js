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
    database.run("CREATE TABLE orderFood (_index int, value real, timestamp char(8))");
    database.run("CREATE TABLE orderDrinks (_index int, value real, timestamp char(8))");
    database.run("CREATE TABLE billsFood (_index int, value real, timestamp char(8))");
    database.run("CREATE TABLE billsDrinks (_index int, value real, timestamp char(8))");
}

function getOrderIndex()
{
    console.log("getOrderIndex()");
    var retval = orderIndex;
    ++orderIndex;
    return retval;
}

function storeData(tableName, data) {
    console.log("storeOrderFood( "+ tableName+" )");
    var timestamp = moment().format();
    var db = database.prepare("INSERT INTO " + tableName + " VALUES (?,?,?)");
    db.run(data.orderIndex, JSON.stringify(data), timestamp);
}

function getAllFromTable(tableName){
    return new Promise(function(resolve, reject) {
        database.serialize(function(){
            var query = "SELECT * FROM " + tableName;
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

function clearTable(tableName){

}

function deleteOrderByIndex(tableName, index) {
    return new Promise(function(resolve, reject) {
        database.run("DELETE FROM "+tableName+" WHERE _index=?", index, function(err) {
            if(err)
            {
                reject(err);
            }
            else{
                resolve();
            }
        });
    });
}

module.exports = {
    initializeBuffer: initializeBuffer,
    storeData: storeData,
    getAllFromTable: getAllFromTable,
    getOrderIndex: getOrderIndex,
    deleteOrderByIndex: deleteOrderByIndex
}