const mongoose = require("mongoose");

const PostMessage = mongoose.model(
  "Posts",
  mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Likes",
      require: true,
    },
    user: {
      fullName: {
        type: String,
        require: true,
      },
      isVerify: {
        type: Boolean,
        require: true,
      },
      avatarImageURL: {
        type: String,
      },
    },
    postText: {
      type: String,
      require: true,
    },
    postImageURL: {
      type: String,
      default: null,
    },
    createdAt: {
      type: Date,
      require: true,
    },
    UserId: {
      type: String,
      require: true,
    },
  })
);

module.exports = PostMessage;
