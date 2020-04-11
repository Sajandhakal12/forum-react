const router = require("express").Router();

const {
  createThread,
  showThread,
  showThreadById,
} = require("../../controllers/forum/ThreadController");

router.post("/create", createThread);
router.get("/forum/:id", showThread);
router.get("/:id", showThreadById);

module.exports = router;
