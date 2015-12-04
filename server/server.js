/**
 * Created by anicam on 27/11/2015.
 */






//set up =====================================
var express = require('express');
var app = express();                               // create our app w/ express
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)




app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");

var file = 'text.db';
var exists =  fs.existsSync(file);
var db = new sqlite3.Database(file);
console.log("App connect to database");


db.serialize(function() {

  //
  if(!exists)
  {
    // db.run("CREATE TABLE Stuff  (info TEXT)");
    db.run("CREATE TABLE lorem (info TEXT)");
  }

  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 3; i++) {
    stmt.run("anica " + i);
  }
  stmt.finalize();

  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
    console.log(row.id + ": " + row.info);
  });
});

db.close()
console.log("App run transaction");
