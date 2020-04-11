const router = require("express").Router();
const {
  createForum,
  showForums,
} = require("../../controllers/forum/ForumController");

router.post("/create", createForum);
router.get("/:id", (req, res) => {
  res.send("/:id");
});
router.get("/category/:id", showForums);

module.exports = router;
