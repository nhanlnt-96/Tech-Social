const sendEmail = require("../configs/nodemailer");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserMessage = require("../models/UserMessage");
const { createToken } = require("../JWT/jwt");
const { verify } = require("jsonwebtoken");
const PostMessage = require("../models/PostMessage");

//sign up v.2.0
const signUpAccount = async (req, res) => {
  const _id = new mongoose.Types.ObjectId();
  const { fullName, email, avatarImageURL, password } = req.body;
  const emailCheck = await UserMessage.findOne({ email });
  const createdAt = new Date();

  try {
    if (emailCheck) {
      res.status(400).json({ error: "Email already exist. 🤔" });
    }
    if (!emailCheck) {
      bcrypt.hash(password, 10).then(async (hash) => {
        await new UserMessage({
          _id,
          email,
          fullName,
          avatarImageURL,
          password: hash,
          createdAt,
        }).save();
        res.status(201).json("Register 😍");
      });
    }
  } catch (error) {
    res.status(400).json({ error: { error } });
  }
};

//verify request
const verifyRequest = async (req, res) => {
  const { _id, email, fullName } = req.body;
  try {
    await sendEmail(res, "confirm", _id, email, fullName);
  } catch (error) {
    res.status(400).json({ error: { error } });
  }
};

// verify user
const verifyUser = async (req, res) => {
  try {
    const { _id } = verify(req.params.token, process.env.EMAIL_TOKEN);
    await UserMessage.findOneAndUpdate(
      {
        _id,
        isVerify: false,
      },
      { $set: { isVerify: true } },
      { new: true },
      (error, doc) => {
        if (doc) {
          res.status(200).json({ success: true, data: doc });
        } else {
          res.status(400).json({ error: "Your account is verified 🤔" });
        }
      }
    ).select("-password");
  } catch (error) {
    res.status(400).json({ error: { error } });
  }
};

//sign in
const signInAccount = async (req, res) => {
  const { email, password } = req.body;
  const emailCheck = await UserMessage.findOne({ email });
  try {
    if (!emailCheck) {
      res.status(400).json({ error: "Hmm, that email doesn't look right. 😳" });
    } else {
      bcrypt.compare(password, emailCheck.password).then((match) => {
        if (!match) {
          res.status(400).json({
            error: "Hmm, that password doesn't look right. 🤔",
          });
        } else {
          const accessToken = createToken(emailCheck);
          res.status(200).json({
            user: {
              email: emailCheck.email,
              id: emailCheck._id,
              fullName: emailCheck.fullName,
              isVerify: emailCheck.isVerify,
              avatarImageURL: emailCheck.avatarImageURL,
              iat: emailCheck.iat,
            },
            token: accessToken,
          });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ error: { error } });
  }
};

//user profile
const getUserProfile = async (req, res) => {
  const id = req.params.id;
  const profileUser = await UserMessage.findById(id).select("-password");
  const postByUser = await PostMessage.aggregate([
    {
      $match: { UserId: id },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "PostId",
        as: "Likes",
      },
    },
  ]);
  try {
    res.status(200).json({
      user: profileUser,
      posts: postByUser,
    });
  } catch (error) {
    res.status(400).json({ error: { error } });
  }
};

//reset password
const changePasswordRequest = async (req, res) => {
  const { email } = req.body;
  const emailCheck = await UserMessage.findOne({ email });
  try {
    if (!emailCheck) {
      res.status(400).json({ error: "Hmm, that email doesn't look right. 😳" });
    } else {
      sendEmail(
        res,
        "reset",
        emailCheck._id,
        emailCheck.email,
        emailCheck.fullName
      );
    }
  } catch (error) {
    res.status(400).json({ error: { error } });
  }
};

const validateResetPasswordToken = (req, res) => {
  const { token } = req.body;
  try {
    verify(token, process.env.EMAIL_TOKEN);
    res.status(200).json("OK");
  } catch (error) {
    res.status(500).json({ error: { error } });
  }
};

const resetPassword = async (req, res) => {
  const { _id } = verify(req.params.token, process.env.EMAIL_TOKEN);
  const { password } = req.body;
  try {
    bcrypt.hash(password, 10).then(async (hash) => {
      await UserMessage.findOneAndUpdate(
        {
          _id,
        },
        { $set: { password: hash } }
      );
      res.status(200).json("Password changed 😍");
    });
  } catch (error) {
    res.status(400).json({ error: { error } });
  }
};

module.exports = {
  signUpAccount,
  verifyUser,
  verifyRequest,
  signInAccount,
  getUserProfile,
  changePasswordRequest,
  validateResetPasswordToken,
  resetPassword,
};
