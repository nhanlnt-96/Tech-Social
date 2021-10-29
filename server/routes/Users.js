const express = require("express");
const { validateToken } = require("../JWT/jwt");
const {
  signUpAccount,
  signInAccount,
  getUserProfile,
  resetPasswordRequest,
  verifyUser,
  verifyRequest,
  resetPassword,
  validateTokenToAuth,
} = require("../controllers/Users");

const router = express.Router();

//sign up
router.post("/", signUpAccount);

//verify user
router.post("/verify/request", validateToken, verifyRequest);
router.patch("/verify/user/:token", validateToken, verifyUser);

//login
router.post("/login", signInAccount);

//user profile
router.get("/profile/:id", validateToken, getUserProfile);

//reset password
router.post("/change-password-request", resetPasswordRequest);
router.patch("/reset-password/user/:token", resetPassword);

// validate token
router.get("/validate-token", validateTokenToAuth);

module.exports = router;
