let Category = require("../../models/forum/Category");

exports.createPost = (req, res) => {
  const newPost = {
    id: req.body.id,
    content: req.body.content,
    createdAt: Date.now(),
    userId: req.body.userId,
    threadId: req.body.threadId,
  };
  console.log(newPost);
  Category.createPost(newPost, (err, result) => {
    if (err) {
      res
        .status(200)
        .json({ error: true, Message: "Error executing MySQL query" });
    } else {
      res.status(201).json({
        message: "New Thread added",
        result: newPost,
      });
    }
  });
};

exports.findPost = (req, res) => {
  const id = req.params.id;
  Category.findPost(id, (err, result) => {
    if (err) {
      res
        .status(200)
        .json({ error: true, Message: "Error executing MySQL query" });
    } else {
      res.status(201).json({
        message: "New post added",
        result: result,
      });
    }
  });
};
