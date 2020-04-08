const router = require("express").Router();
const {
  createCategory,
  getCatByID,
  getCats,
} = require("../../controllers/forum/CategoryController");

router.post("/create", createCategory);
router.get("/:id", getCatByID);
router.get("/", getCats);
module.exports = router;
