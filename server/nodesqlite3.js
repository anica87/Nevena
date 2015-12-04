/**
 * Created by anicam on 26/11/2015.
 */


// check if the file exists
  var fs = require('fs');
  var file = 'text.db';
  var exists =  fs.existsSync(file);

// connect to our file/database
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(file);
//var db = new sqlite3.Database(':memory:');


//run transaction and decide if they are going to be in parallel or series.
db.serialize(function() {

  //
  if(!exists)
  {
   // db.run("CREATE TABLE Stuff  (info TEXT)");
    db.run("CREATE TABLE lorem (info TEXT)");
    db.run("CREATE TABLE customers (CustomerID INTEGER PRIMARY KEY AUTOINCREMENT,CompanyName VARCHAR(60),ContactName VARCHAR(40),ContactTitle VARCHAR(60),Address VARCHAR(60),City VARCHAR(60,State VARCHAR(2))");
  }
  var context = db.prepare("insert into customers VALUES (?)");
  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 120; i++) {
    stmt.run("Ipsum " + i);
  }

  context.run(1, "anica company", "anica contact", "Anicatitle", "anicaAddress" , "anicaCity", "IL");
  context.finalize();
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
    console.log(row.id + ": " + row.info);
  });

  db.each("SELECT * FROM customers", function(err, row) {
    console.log(row);
  });
});

db.close()
/*var fs = require("fs");
var file = process.env.CLOUD_DIR + "/" + "test.db";
var exists = fs.existsSync(file);

if(!exists) {
  console.log("Creating DB file.");
 // fs.openSync(file, "w");
}

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
  if(!exists) {
    db.run("CREATE TABLE Stuff (thing TEXT)");
  }

  var stmt = db.prepare("INSERT INTO Stuff VALUES (?)");

//Insert random data
  var rnd;
  for (var i = 0; i < 10; i++) {
    rnd = Math.floor(Math.random() * 10000000);
    stmt.run("Thing #" + rnd);
  }

  stmt.finalize();
  db.each("SELECT rowid AS id, thing FROM Stuff", function(err, row) {
    console.log(row.id + ": " + row.thing);
  });
});

db.close();*/
