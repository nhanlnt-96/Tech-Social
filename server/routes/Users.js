const express = require("express");
const { validateToken } = require("../JWT/jwt");
const {
  signUpAccount,
  signInAccount,
  getAuthUser,
  getUserProfile,
  changePassword,
  verifyUser,
  verifyRequest,
} = require("../controllers/Users");

const router = express.Router();

//sign up
router.post("/", signUpAccount);

//verify user
router.post("/verify/request", verifyRequest);
router.get("/verify/user/:token", verifyUser);

//login
router.post("/login", signInAccount);
router.get("/auth-user", validateToken, getAuthUser);

//user profile
router.get("/profile/:id", getUserProfile);

//change password
router.put("/change-password", changePassword);

module.exports = router;
