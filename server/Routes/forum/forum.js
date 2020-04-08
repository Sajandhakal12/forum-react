const router = require("express").Router();
const { createForum } = require("../../controllers/forum/ForumController");

router.post("/create", createForum);
router.get("/:id", (req, res) => {
  res.send("create");
});
router.post("/category/:id", (req, res) => {
  res.send("create");
});

module.exports = router;
