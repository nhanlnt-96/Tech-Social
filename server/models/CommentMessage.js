const mongoose = require('mongoose');

const CommentMessage = mongoose.model('Comments', mongoose.Schema({
    username: {
      type: String,
      require: true
    },
    commentContent: {
      type: String,
      require: true
    },
    createdAt: {
      type: Date,
      require: true
    },
    PostId: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
      require: true
    }
  })
);

module.exports = CommentMessage;