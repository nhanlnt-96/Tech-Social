const mongoose = require("mongoose");

const TokenMessage = mongoose.model(
  "Tokens",
  mongoose.Schema({
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
    },
    token: {
      type: String,
      require: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
      expires: 7200,
    },
  })
);

module.exports = TokenMessage;
