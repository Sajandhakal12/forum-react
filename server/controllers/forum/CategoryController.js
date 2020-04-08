let Category = require("../../models/forum/Category");
exports.createCategory = (req, res) => {
  const newCategory = {
    id: req.body.id,
    title: req.body.title,
    createdat: Date.now(),
  };
  console.log("From createController", newCategory);
  Category.Create(newCategory, (err, result) => {
    if (err) {
      res
        .status(200)
        .json({ Error: true, Message: "Error executing MySQL query" });
    } else {
      res.status(201).json({
        message: "New Category added",
        result: result,
      });
    }
  });
};

exports.getCatByID = (req, res) => {
  const id = req.params.id;

  Category.findId(id, (err, result) => {
    if (err) {
      res
        .status(200)
        .json({ Error: true, Message: "Error executing MySQL query" });
    } else {
      res.status(201).json({
        message: "Sucess",
        result: result,
      });
    }
  });
};

exports.getCats = (req, res) => {
  Category.find((err, result) => {
    if (err) {
      res
        .status(200)
        .json({ Error: true, Message: "Error executing MySQL query" });
    } else {
      res.status(201).json({
        message: "Sucess",
        result: result,
      });
    }
  });
};
