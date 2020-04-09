var connection = require("../db.js");
var mysql = require("mysql");

var User = new Object();

User.checkUser = function (email, result) {
  let query = "SELECT email FROM ?? WHERE ??=?";

  let table = ["user", "email", email];

  query = mysql.format(query, table);

  connection.query(query, function (err, res) {
    if (err) {
      result(err, res);
    } else {
      result(null, res);
    }
  });
};
User.signUpUser = function (newUser, result) {
  console.log("signUP called");
  let query = "INSERT INTO  ?? SET ?";
  let table = ["user"];
  query = mysql.format(query, table);
  console.log(newUser);
  connection.query(query, newUser, function (err, res) {
    if (err) {
      result(err, res);
    } else {
      result(null, res);
    }
  });
};

User.removeUser = function (email, result) {
  console.log(email);
  let query = "DELETE FROM ?? where ?? =? ";

  let table = ["user", "email", email];

  query = mysql.format(query, table);
  connection.query(query, function (err, res) {
    if (err) {
      console.log("RemoveUser DB error: ", err);
      result(err, res);
    } else {
      result(null, res);
    }
  });
};

User.findUser = function (user, result) {
  connection.query(
    `Select * from user where email = '${user.email}';`,
    function (err, res) {
      if (err) {
        result(err, res);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = User;
