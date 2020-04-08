var connection = require("../db.js");
var mysql = require("mysql");

var Category = new Object();

Category.Create = function (newCategory, result) {
  let query = "INSERT INTO  ?? SET ?";
  let table = ["category"];
  query = mysql.format(query, table);
  connection.query(query, newCategory, function (err, res) {
    if (err) {
      result(err, res);
    } else {
      result(null, res);
    }
  });
};

Category.findId = function (id, result) {
  let query = "select * from ?? where ??= ?";
  let table = ["category", "id", id];
  query = mysql.format(query, table);
  connection.query(query, function (err, res) {
    if (err) {
      result(err, res);
    } else {
      result(null, res);
    }
  });
};

Category.find = function (result) {
  let query = "select * from ??";
  let table = ["category"];
  query = mysql.format(query, table);
  connection.query(query, function (err, res) {
    if (err) {
      result(err, res);
    } else {
      result(null, res);
    }
  });
};
module.exports = Category;
