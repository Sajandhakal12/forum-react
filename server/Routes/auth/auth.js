const router = require("express").Router();
const verifyToken = require("../../verify");

const {
  init_user,
  signUP_user,
  remove_user,
  login_user,
} = require("../../controllers/auth/userController");

router.get("/init", verifyToken, init_user);
router.post("/register", signUP_user);
router.post("/login", login_user);
router.post("/removeuser", remove_user);

module.exports = router;
