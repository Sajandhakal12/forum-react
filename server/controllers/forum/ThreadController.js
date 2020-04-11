let Category = require("../../models/forum/Category");
exports.createThread = (req, res) => {
  const { id, title, content, userId, forumId } = req.body;
  const newThread = {
    id,
    title,
    content,
    createdAt: Date.now(),
    userId,
    forumId,
  };
  Category.createThread(newThread, (err, result) => {
    if (err) {
      res
        .status(200)
        .json({ error: true, Message: "Error executing MySQL query" });
    } else {
      res.status(201).json({
        message: "New Thread added",
        result: newThread.id,
      });
    }
  });
};

exports.showThread = (req, res) => {
  const id = req.params.id;
  Category.showThread(id, (err, result) => {
    if (err) {
      res
        .status(200)
        .json({ error: true, Message: "Error executing MySQL query" });
    } else {
      res.status(201).json({
        message: "Sucess",
        result: result,
      });
    }
  });
};

exports.showThreadById = (req, res) => {
  const id = req.params.id;
  Category.showThreadById(id, (err, result) => {
    if (err) {
      res
        .status(200)
        .json({ error: true, Message: "Error executing MySQL query" });
    } else {
      res.status(201).json({
        message: "Sucess",
        result: result,
      });
    }
  });
};
