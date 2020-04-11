const router = require("express").Router();
const {
  createForum,
  showForumById,
  showForums,
} = require("../../controllers/forum/ForumController");

router.post("/create", createForum);
router.get("/:id", showForumById);
router.get("/category/:id", showForums);

module.exports = router;
