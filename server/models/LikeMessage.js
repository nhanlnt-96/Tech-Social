const mongoose = require('mongoose');

const LikeMessage = mongoose.model('Likes', mongoose.Schema({
    createdAt: {
      type: Date,
      default: new Date()
    },
    UserId: {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
      require: true
    },
    PostId: {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
      require: true
    }
  })
);

module.exports = LikeMessage;