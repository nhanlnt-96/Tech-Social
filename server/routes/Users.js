const express = require("express");
const { validateToken } = require("../JWT/jwt");
const {
  signUpAccount,
  signInAccount,
  getAuthUser,
  getUserProfile,
  changePasswordRequest,
  verifyUser,
  verifyRequest,
  resetPassword,
  validateResetPasswordToken,
} = require("../controllers/Users");

const router = express.Router();

//sign up
router.post("/", signUpAccount);

//verify user
router.post("/verify/request", verifyRequest);
router.get("/verify/user/:token", verifyUser);

//login
router.post("/login", signInAccount);

//user profile
router.get("/profile/:id", getUserProfile);

//change password
router.post("/change-password-request", changePasswordRequest);
router.post("/validate-reset-password/", validateResetPasswordToken);
router.put("/reset-password/user/:token", resetPassword);

module.exports = router;
