let Category = require("../../models/forum/Category");
exports.createForum = (req, res) => {
  //   console.log("from createForum", res.body);
  const { id, title, categoryId } = req.body;
  const newForum = {
    id,
    title,
    createdAt: Date.now(),
    categoryId,
  };
  console.log("From forumController", newForum);
  Category.createForum(newForum, (err, result) => {
    if (err) {
      res
        .status(200)
        .json({ error: true, Message: "Error executing MySQL query" });
    } else {
      res.status(201).json({
        message: "New forum added",
        result: newForum.id,
      });
    }
  });
};

exports.showForums = (req, res) => {
  let id = req.params.id;
  console.log("from show forums", id);
  Category.showForums(id, (err, result) => {
    if (err) {
      res
        .status(200)
        .json({ error: true, message: "Error executing MySQL query" });
    } else {
      res.status(201).json({
        message: "Sucess",
        result: result,
      });
    }
  });
};
