let Category = require("../../models/forum/Category");
exports.createForum = (req, res) => {
  //   console.log("from createForum", res.body);
  const { title, categoryId } = req.body;
  const newForum = {
    id: Date.now(),
    title,
    createdAt: Date.now(),
    categoryId,
  };
  console.log("From forumController", newForum);
  Category.createForum(newForum, (err, result) => {
    if (err) {
      res
        .status(200)
        .json({ Error: true, Message: "Error executing MySQL query" });
    } else {
      res.status(201).json({
        message: "New forum added",
        result: newForum.id,
      });
    }
  });
};
