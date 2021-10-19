const mongoose = require('mongoose');

const PostMessage = mongoose.model('Posts', mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Likes',
      require: true
    },
    user: {
      username: {
        type: String,
        require: true
      },
      avatarImageURL: {
        type: String,
      }
    },
    postText: {
      type: String,
      require: true
    },
    postImageURL: {
      type: String
    },
    createdAt: {
      type: Date,
      require: true
    },
    UserId: {
      type: String,
      require: true
    }
  })
);

module.exports = PostMessage;
