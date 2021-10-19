const mongoose = require("mongoose");
const PostMessage = require("../models/PostMessage");
const LikeMessage = require("../models/LikeMessage");
const CommentMessage = require("../models/CommentMessage");

//create post
const createPost = async (req, res) => {
  const _id = mongoose.Types.ObjectId();
  const createdAt = new Date();
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  post.avatarImageURL = req.user.avatarImageURL;
  const newPost = new PostMessage({
    _id,
    user: {
      username: post.username,
      avatarImageURL: post.avatarImageURL,
    },
    postText: post.postText,
    postImageURL: post.postImageURL,
    createdAt,
    UserId: post.UserId,
  });
  try {
    await newPost.save();
    res.json(post);
  } catch (error) {
    res.json({ error: { error } });
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
  const likedPosts = await LikeMessage.find({ UserId: req.user.id });

  try {
    res.json({ allPosts, likedPosts });
  } catch (error) {
    res.json({ error: { error } });
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
    res.json(postById);
  } catch (error) {
    res.json({ error: { error } });
  }
};

//get post by user
const getPostByUser = async (req, res) => {
  const id = req.params.id;
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
    res.json(postByUser);
  } catch (error) {
    res.json({ error: { error } });
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
  getPostByUser,
  deletePost,
  editPost,
};
