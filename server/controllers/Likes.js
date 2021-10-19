const LikeMessage = require('../models/LikeMessage');

// like
const likeSystem = async (req, res) => {
  const {PostId} = req.body;
  const UserId = req.user.id;
  const createdAt = new Date();
  const found = await LikeMessage.findOne({PostId, UserId});

  if (!found) {
    await LikeMessage.create({createdAt, PostId, UserId});
    res.json({liked: true});
  } else {
    await LikeMessage.findOneAndDelete({PostId, UserId});
    res.json({liked: false});
  }
};

module.exports = {likeSystem}