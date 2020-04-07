const mysql = require('mysql');

//database connection
var connection = mysql.createConnection(DATABASE_CONNECTION = {
    host: "localhost",
    user: "root",
    password: "sql123",
    database: "user"
  });
  
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected! lalala");
  
  })

  module.exports= connection;