const sendEmail = require("../configs/nodemailer");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UserMessage = require("../models/UserMessage");
const PostMessage = require("../models/PostMessage");
const TokenMessage = require("../models/TokenMessage");
const { createToken, createEmailToken } = require("../JWT/jwt");
const { verify } = require("jsonwebtoken");

//sign up v.2.0
const signUpAccount = async (req, res) => {
  const _id = new mongoose.Types.ObjectId();
  const { fullName, email, avatarImageURL, password, coverImageURL } = req.body;
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
          coverImageURL,
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
  const createdAt = new Date();
  const { id, email, fullName } = req.user.sub;
  let tokenCheck = await TokenMessage.findOne({ UserId: id });
  try {
    if (!tokenCheck) {
      await new TokenMessage({
        UserId: id,
        token: createEmailToken(id, "reset"),
        createdAt,
      }).save((err, doc) => {
        if (doc) {
          sendEmail(res, "confirm", email, fullName, doc.token);
        }
      });
    } else {
      sendEmail(res, "confirm", email, fullName, tokenCheck.token);
    }
  } catch (error) {
    res.status(400).json({ error: { error } });
  }
};

// verify user
const verifyUser = async (req, res) => {
  const token = req.params.token;
  const { _id, type } = verify(token, process.env.EMAIL_TOKEN);
  const tokenCheck = await TokenMessage.findOne({ UserId: _id, token });
  try {
    if (!tokenCheck && type !== "confirm") {
      res.status(400).json({ error: "Your verify account link has expired." });
    } else {
      await UserMessage.findOneAndUpdate(
        {
          _id,
          isVerify: false,
        },
        { $set: { isVerify: true } },
        { new: true },
        async (error, doc) => {
          if (doc) {
            await tokenCheck.delete();
            res.status(200).json({ success: true, data: doc });
          } else {
            res.status(400).json({ error: "Your account is verified 🤔" });
          }
        }
      ).select("-password");
    }
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
              coverImageURL: emailCheck.coverImageURL,
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
const resetPasswordRequest = async (req, res) => {
  const { email } = req.body;
  const createdAt = new Date();
  const emailCheck = await UserMessage.findOne({ email }).select("-password");
  let tokenCheck = await TokenMessage.findOne({ UserId: emailCheck._id });
  try {
    if (!emailCheck) {
      res.status(400).json({ error: "Hmm, that email doesn't look right. 😳" });
    }

    const { _id, email, fullName } = emailCheck;
    if (!tokenCheck) {
      await new TokenMessage({
        UserId: _id,
        token: createEmailToken(_id, "reset"),
        createdAt,
      }).save((err, doc) => {
        if (doc) {
          sendEmail(res, "reset", email, fullName, doc.token);
        }
      });
    } else {
      sendEmail(res, "reset", email, fullName, tokenCheck.token);
    }
  } catch (error) {
    res.status(400).json({ error: { error } });
  }
};

const resetPassword = async (req, res) => {
  const token = req.params.token;
  const { _id, type } = verify(token, process.env.EMAIL_TOKEN);
  const { password } = req.body;
  const tokenCheck = await TokenMessage.findOne({ UserId: _id, token });
  try {
    if (!tokenCheck && type !== "reset") {
      res.status(400).json({ error: "Your password reset link has expired." });
    } else {
      bcrypt.hash(password, 10).then(async (hash) => {
        await UserMessage.findOneAndUpdate(
          {
            _id,
          },
          { $set: { password: hash } }
        );
        await tokenCheck.delete();
        res.status(200).json("Password reset successfully 😍");
      });
    }
  } catch (error) {
    res.status(400).json({ error: { error } });
  }
};

const validateTokenToAuth = async (req, res) => {
  const token = req.body.token;
  const { _id } = verify(token, process.env.EMAIL_TOKEN);
  const tokenCheck = await TokenMessage.findOne({ UserId: _id, token });
  try {
    if (tokenCheck) {
      res.status(200).json("OK");
    } else {
      res.status(404).json("Expired");
    }
  } catch (error) {
    res.status(400).json({ error: { error } });
  }
};

const updateUser = async (req, res) => {
  const { fullName, avatarImageURL, location, about, coverImageURL } = req.body;
  const id = req.user.sub.id;
  const profileUser = await UserMessage.findById(id).select("-password");
  let updateData = {};
  if (fullName) updateData.fullName = fullName;
  if (avatarImageURL) updateData.avatarImageURL = avatarImageURL;
  if (location) updateData.location = location;
  if (about) updateData.about = about;
  if (coverImageURL) updateData.coverImageURL = coverImageURL;
  try {
    if (profileUser) {
      await UserMessage.findOneAndUpdate(
        { _id: id },
        {
          $set: updateData,
        },
        { new: true },
        (err, doc) => {
          if (err) {
            res.status(400).json({ error: { err } });
          } else {
            res.status(200).json(doc);
          }
        }
      ).select("-password");
    }
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
  resetPasswordRequest,
  resetPassword,
  updateUser,
  validateTokenToAuth,
};
