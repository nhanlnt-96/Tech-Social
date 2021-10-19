const express = require('express');
const {validateToken} = require('../JWT/jwt');
const {createPost, getAllPost, getPostById, getPostByUser, deletePost, editPost} = require('../controllers/Posts');

const router = express.Router();

//create post
router.post('/', validateToken, createPost);

//get post
router.get('/', validateToken, getAllPost);

//get post by id
router.get('/post-by-id/:id', getPostById);

//get post by user
router.get('/post-by-user/:id', getPostByUser);

//delete post
router.delete('/:postId', validateToken, deletePost);

//edit post
router.put('/edit-post',validateToken,editPost);

module.exports = router;