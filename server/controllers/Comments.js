const CommentMessage = require('../models/CommentMessage');

//create comment
const createComment = async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  const createdAt = new Date();
  const newComment = new CommentMessage({
    username: comment.username,
    commentContent: comment.commentContent,
    createdAt,
    PostId: comment.PostId
  });

  try {
    await newComment.save();
    res.json(comment);
  } catch (error) {
    res.json({error: {error}});
  }
};

//get comment
const getAllComment = async (req, res) => {
  const PostId = req.params.postId;
  const comments = await CommentMessage.find({PostId});
  try {
    res.json(comments);
  } catch (error) {
    res.json({error: {error}});
  }
};

//delete comment
const deleteComment = async (req, res) => {
  const commentId = req.params.commentId;

  try {
    await CommentMessage.findOneAndDelete({_id: commentId});
    res.json('Delete comment');
  } catch (error) {
    res.json({error: {error}});
  }
}

module.exports = {createComment, getAllComment, deleteComment}