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

Category.createForum = function (newForum, result) {
  let query = "INSERT INTO  ?? SET ?";
  let table = ["forum"];
  query = mysql.format(query, table);
  connection.query(query, newForum, function (err, res) {
    if (err) {
      result(err, res);
    } else {
      result(null, res);
    }
  });
};

Category.showForum = function (id, result) {
  let query = "SELECT * FROM ?? where ??=?";
  let table = ["forum", "categoryid"];
  query = mysql.format(query, table);
  connection.query(query, id, function (err, res) {
    if (err) {
      result(err, res);
    } else {
      result(null, res);
    }
  });
};

Category.showForumById = function (id, result) {
  let query = "SELECT * FROM ?? WHERE ??=?";
  let table = ["forum", "id"];
  query = mysql.format(query, table);
  connection.query(query, id, function (err, res) {
    if (err) {
      result(err, res);
    } else {
      result(null, res);
    }
  });
};

Category.createThread = function (newThread, result) {
  let query = "INSERT INTO  ?? SET ?";
  let table = ["thread"];
  query = mysql.format(query, table);
  connection.query(query, newThread, function (err, res) {
    if (err) {
      result(err, res);
    } else {
      result(null, res);
    }
  });
};

Category.showThread = function (id, result) {
  let query = "SELECT * FROM ?? WHERE ?? =?";
  let table = ["thread", "forumId"];
  query = mysql.format(query, table);
  connection.query(query, id, function (err, res) {
    if (err) {
      result(err, res);
    } else {
      result(null, res);
    }
  });
};
Category.showThreadById = function (id, result) {
  let query = "SELECT * FROM ?? WHERE ?? =?";
  let table = ["thread", "id"];
  query = mysql.format(query, table);
  connection.query(query, id, function (err, res) {
    if (err) {
      result(err, res);
    } else {
      result(null, res);
    }
  });
};
Category.createPost = function (newPost, result) {
  let query = "INSERT INTO  ?? SET ?";
  let table = ["post"];
  query = mysql.format(query, table);
  connection.query(query, newPost, function (err, res) {
    if (err) {
      result(err, res);
    } else {
      result(null, res);
    }
  });
};

Category.findPost = function (id, result) {
  console.log("from find post", id);
  let query = "SELECT * FROM ?? WHERE ?? =?";
  let table = ["post", "threadId"];
  query = mysql.format(query, table);
  connection.query(query, id, function (err, res) {
    if (err) {
      result(err, res);
    } else {
      result(null, res);
    }
  });
};
module.exports = Category;
