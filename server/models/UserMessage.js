const mongoose = require("mongoose");

const UserMessage = mongoose.model(
  "Users",
  mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
      default: null
    },
    password: {
      type: String,
      require: true,
    },
    avatarImageURL: {
      type: String,
      require: false,
      default: null,
    },
    isVerify: {
      type: Boolean,
      require: true,
      default: false,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  })
);

module.exports = UserMessage;
