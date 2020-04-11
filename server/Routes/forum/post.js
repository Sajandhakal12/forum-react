const router = require("express").Router();
const {
  createPost,
  findPost,
} = require("../../controllers/forum/PostController");

router.post("/create", createPost);
router.get("/thread/:id", findPost);
module.exports = router;
