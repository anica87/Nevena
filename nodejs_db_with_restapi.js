/**
 * Created by anicam on 27/11/2015.
 */
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
//var db = new sqlite3.Database('data/demodb02');
var file = 'sqlite3.db';
var exists =  fs.existsSync(file);
var db = new sqlite3.Database(file);


db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS customers (CustomerID INTEGER NOT NULL PRIMARY KEY  AUTOINCREMENT,CompanyName VARCHAR(60),ContactName VARCHAR(40),ContactTitle VARCHAR(60),Address VARCHAR(60),City VARCHAR(60),State VARCHAR(2))");


  var context = db.prepare("insert into customers VALUES (?,?,?,?,?,?,?)");
  context.run(null,"company", "contact", "title", "address" , "City", "IL");
  context.finalize();
  db.run("PRAGMA foreign_keys = ON");

  db.run("CREATE TABLE IF NOT EXISTS products (ProductID INTEGER NOT NULL PRIMARY KEY  AUTOINCREMENT,ProductName VARCHAR(60), CustomerID INTEGER ,FOREIGN KEY (CustomerID) REFERENCES customers(CustomerID))");
  var context = db.prepare("insert into products VALUES (?,?,?)");
  context.run(null,"productname",1);
  context.finalize();

  db.run("CREATE TABLE IF NOT EXISTS orders (OrderID INTEGER NOT NULL PRIMARY KEY  AUTOINCREMENT,OrderName VARCHAR(60),CustomerID INTEGER ,ProductID INTEGER ,FOREIGN KEY (CustomerID) REFERENCES customers(CustomerID), FOREIGN KEY (ProductID) REFERENCES products(ProductID))");
  var context = db.prepare("insert into orders VALUES (?,?,?,?)");
  context.run(null,"ordername",1,1);
  context.finalize();
});



var express = require('express');
var bodyParser = require('body-parser')
var restapi = express();
restapi.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});
restapi.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
restapi.use(bodyParser.json());                                     // parse application/json
restapi.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


/*var _ = require('underscore');

function allowCrossDomain(req, res, next) {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  var origin = req.headers.origin;
  if (_.contains(app.get('allowed_origins'), origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
}*/

 //restapi.use(morgan('dev'));                                         // log every request to the console

 //restapi.use(methodOverride());
 //restapi.use(allowCrossDomain);



restapi.get('/data', function(req, res){
  db.all("SELECT * FROM customers", function(err, rows, fileds){
    if(err !== null){
      // Express handles errors via its next function.
      // It will call the next operation layer (middleware),
      // which is by default one that handles errors.
      next(err);
    }
    else{
      res.json({"customers": rows})
      for (var i in rows){
       // res.json({ "the whole object looks like this": rows[i]});
        console.log(rows[i]);
      }


    }

  });
});

restapi.get('/customers', function(req, res){
  db.get("SELECT * FROM customers", function(err, result){
    res.json({ "the whole object looks like this": result});
  });
});
function eachRow(row, i, rows) {
  console.log(row.id + ": " + row.info);
  if ((i + 1) === rows.length) {
    start = Date.now() - start;
    console.log(start);
  }
}

restapi.get('/customers/:id', function(req, res){
  console.log(req.params.id);
  db.get("SELECT * FROM customers WHERE CustomerID =" + req.params.id, function(err, row){
    res.json({ "author": row});
  });
});

restapi.delete('/customers/:id', function(req, res){
  console.log(req.params.id);
 // db.run("BEGIN TRANSACTION");
  db.run("delete from customers where CustomerID =" + req.params.id, function(err, row){
    if(err)
    {
      console.log("there is the bug");
    }
    else
    {
      res.json({ "deleted the customer with following ID": req.params.id});
    }
  });
  //db.run("END");
});

restapi.put('/customers/:id', function(req, res){
  console.log(req.params.id);
  console.log(JSON.stringify(req.body.author));
  console.log("update customers set  CompanyName ='" +req.body.CompanyName+ "' where CustomerID = " + req.params.id);
  db.run("update customers set  CompanyName ='" +req.body.CompanyName+ "' where CustomerID = " + req.params.id,  function(err, row){
      if(err)
      {
        console.log("there is the bug");
        console.log(err);
      }
      else
      {
        res.json({ "updated the customer with following ID": req.params.id});
      }
  }
  );
});

// post to addcustomer
restapi.post('/addcustomer', function(req, res){
  console.log(req.body);
  var id = parseInt(req.body.CustomerID);
  console.log(req.body.CompanyName);
  var context = db.prepare("insert into customers VALUES (NULL,?,?,?,?,?,?)");
  // should check if alreday there is a customer with that id
  db.run("BEGIN TRANSACTION");
  db.run("insert into customers (CustomerID,CompanyName,ContactName, ContactTitle, Address,City,State)" + "VALUES( null,'" + req.body.CompanyName  + "','" + req.body.ContactName + "','" + req.body.ContactTitle  + "','" + req.body.Address + "','" + req.body.City  + "','" + req.body.State +"')"
    ,function(err, row)
    {
      if (err){
        console.log("there is the bug");
        console.log(err);
        res.status(500);
      }
      else {
        console.log("there isn't the bug");
        res.status(202);
      }
      res.end();
    }
    );
  db.run("END");
  context.finalize();
});


/*---------------------- PRODUCTS ---------------------- */

restapi.get('/products', function(req, res){
  db.all("select * from products", function(err, rows){
    if(err !== null){
      next(err);
    }
    else{
      res.json({"products": rows})
      for (var i in rows){
        console.log(rows[i]);
      }
    }
  });
});


restapi.get('/:customerid/:productid', function(req, res){
  console.log(req.params.customerid);
  console.log(req.params.productid);
  db.get("SELECT * FROM products WHERE ProductID =" + req.params.productid, function(err, row){
    res.json({ "product": row});
  });
});

restapi.delete('/:customerid/:productid', function(req, res){
  console.log(req.params.customerId);
  console.log(req.params.productid);
  // db.run("BEGIN TRANSACTION");
  db.run("delete from products where ProductID =" + req.params.productid, function(err, row){
    if(err)
    {
      console.log("there is the bug");
    }
    else
    {
      res.json({ "deleted the product with following ID": req.params.productid});
    }
  });
});

restapi.put('/:customerid/:productid', function(req, res){
  console.log(req.params.customerid);
  console.log(req.params.productid);
  console.log(JSON.stringify(req.body.author));
  console.log("update products set  ProductName ='" +req.body.ProductName+ "' where ProductID = " + req.params.productid);
  db.run("update products set  ProductName ='" +req.body.ProductName+ "' where ProductID = " + req.params.productid,  function(err, row){
      if(err)
      {
        console.log("there is the bug");
        console.log(err);
      }
      else
      {
        res.json({ "updated the product with following ID": req.params.productid});
      }
    }
  );
});

restapi.post('/:customerid/addproduct', function(req, res){
 console.log("productName" + req.body.ProductName);
  console.log("customerId" + req.params.customerid);
  console.log("customerId iz body- a " +req.body.customerid);
  console.log("insert into products (ProductID,ProductName,CustomerID)" + "VALUES( null,'" + req.body.ProductName  + "'," + req.params.customerid +"");
  var context = db.prepare("insert into products VALUES (NULL,?,?)");
  // should check if alreday there is a customer with that id
  db.run("BEGIN TRANSACTION");
  db.run("insert into products (ProductID,ProductName,CustomerID)" + "VALUES( null,'" + req.body.ProductName  + "'," + req.params.customerid +")"
    ,function(err, row)
    {
      if (err){
        console.log("there is the bug");
        console.log(err);
        res.status(500);
      }
      else {
        console.log("there isn't the bug");
        res.status(202);
      }
      res.end();
    }
  );
  db.run("END");
  context.finalize();
});
/*--------------------------------------------------------*/

/* ---------------------- ORDERS ------------------------- */
restapi.get('/orders', function(req, res){
  db.all("select * from orders", function(err, rows){
    if(err !== null){
      next(err);
    }
    else{
      res.json({"orders": rows})
      for (var i in rows){
        console.log(rows[i]);
      }
    }
  });
});


restapi.get('/:customerid/:productid/:orderid', function(req, res){
  console.log(req.params.customerid);
  console.log(req.params.productid);
  db.get("SELECT * FROM orders WHERE OrderID =" + req.params.orderid, function(err, row){
    res.json({ "product": row});
  });
});

restapi.delete('/:customerid/:productid/:orderid', function(req, res){
  console.log(req.params.customerId);
  console.log(req.params.productid);
  // db.run("BEGIN TRANSACTION");
  db.run("delete from orders where OrderID =" + req.params.orderid, function(err, row){
    if(err)
    {
      console.log("there is the bug");
    }
    else
    {
      res.json({ "deleted the order with following ID": req.params.orderid});
    }
  });
});

restapi.put('/:customerid/:productid/:orderid', function(req, res){
  console.log(req.params.customerid);
  console.log(req.params.productid);
  console.log(JSON.stringify(req.body.author));
  console.log("update order set  OrderName ='" +req.body.ProductName+ "' where ProductID = " + req.params.orderid);
  db.run("update order set  OrderName ='" +req.body.OrderName + "' where OrderID = " + req.params.orderid,  function(err, row){
      if(err)
      {
        console.log("there is the bug");
        console.log(err);
      }
      else
      {
        res.json({ "updated the order with following ID": req.params.orderid});
      }
    }
  );
});

restapi.post('/:customerid/:productid/addorder', function(req, res){
  console.log("productName" + req.body.ProductName);
  console.log("customerId" + req.params.customerid);
  console.log("customerId iz body- a " +req.body.customerid);
  console.log("insert into orders (OrderID,OrderName,CustomerID, ProductID)" + "VALUES( null,'" + req.body.OrderName  + "'," + req.params.customerid + "'," + req.params.productid +"");
  var context = db.prepare("insert into products VALUES (NULL,?,?)");
  // should check if alreday there is a customer with that id
  db.run("BEGIN TRANSACTION");
  db.run("insert into orders (OrderID,OrderName,CustomerID, ProductID)" + "VALUES( null,'" + req.body.OrderName  + "'," + req.params.customerid  + "'," + req.params.productid +")"
    ,function(err, row)
    {
      if (err){
        console.log("there is the bug");
        console.log(err);
        res.status(500);
      }
      else {
        console.log("there isn't the bug");
        res.status(202);
      }
      res.end();
    }
  );
  db.run("END");
  context.finalize();
});

/* --------------------------------------------------------*/



restapi.get('*', function(req, res){
  res.sendFile('./public/index.html'); // load the sigle view file(angular will handle the page changes on the front-end)
});

restapi.listen(3000);

console.log("Submit GET or POST to http://localhost:3000/data");
