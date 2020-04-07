const router = require("express").Router();
const {
  createCategory,
  getCatByID,
} = require("../../controllers/forum/CategoryController");

router.post("/create", createCategory);
router.get("/:id", getCatByID);
router.get("/", (req, res) => {
  res.send("create");
});

module.exports = router;
