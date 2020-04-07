const router = require("express").Router();

router.post("/create", (req, res) => {
  res.send("create");
});
router.get("/:id", (req, res) => {
  res.send("create");
});
router.get("/forum/:id", (req, res) => {
  res.send("create");
});
module.exports = router;
