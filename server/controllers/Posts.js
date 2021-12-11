const mongoose = require("mongoose");
const PostMessage = require("../models/PostMessage");
const LikeMessage = require("../models/LikeMessage");
const CommentMessage = require("../models/CommentMessage");

//create post
const createPost = async (req, res) => {
  const _id = mongoose.Types.ObjectId();
  const createdAt = new Date();
  const { fullName, isVerify, avatarImageURL, id } = req.user.sub;
  const post = req.body;
  post.fullName = fullName;
  post.UserId = id;
  post.avatarImageURL = avatarImageURL;
  post.isVerify = isVerify;
  const newPost = new PostMessage({
    _id,
    user: {
      fullName: post.fullName,
      isVerify: post.isVerify,
      avatarImageURL: post.avatarImageURL,
    },
    postText: post.postText,
    postImageURL: post.postImageURL,
    createdAt,
    UserId: post.UserId,
  });
  try {
    await newPost.save();
    res.status(200).json("Posted 😍");
  } catch (error) {
    res.status(400).json({ error: { error } });
  }
};

//get post
const getAllPost = async (req, res) => {
  const allPosts = await PostMessage.aggregate([
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "PostId",
        as: "Likes",
      },
    },
  ]);
  const likedPosts = await LikeMessage.find({ UserId: req.user.sub.id });

  try {
    res.status(200).json({ allPosts, likedPosts });
  } catch (error) {
    res.status(400).json({ error: { error } });
  }
};

//get post by id
const getPostById = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  const postById = await PostMessage.aggregate([
    {
      $match: { _id: id },
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
    res.status(200).json(postById);
  } catch (error) {
    res.status(400).json({ error: { error } });
  }
};

//delete post
const deletePost = async (req, res) => {
  const _id = req.params.postId;
  try {
    await PostMessage.findOneAndDelete({ _id }).then(async () => {
      await CommentMessage.findOneAndDelete({ PostId: _id });
      await LikeMessage.findOneAndDelete({ PostId: _id });
    });
    res.json("Post deleted 🙁");
  } catch (error) {
    res.json({ error: { error } });
  }
};

//edit post
const editPost = async (req, res) => {
  const { newPostText, id } = req.body;
  try {
    await PostMessage.findOneAndUpdate({ _id: id }, { postText: newPostText });
    res.json(newPostText);
  } catch (error) {
    res.json({ error: { error } });
  }
};

module.exports = {
  createPost,
  getAllPost,
  getPostById,
  deletePost,
  editPost,
};
