const express = require('express');
const {validateToken} = require('../JWT/jwt');
const {createComment, getAllComment, deleteComment} = require('../controllers/Comments');

const router = express.Router();

//create comment
router.post('/', validateToken, createComment);

//get comments
router.get('/:postId', getAllComment);

//delete comment
router.delete('/:commentId', validateToken, deleteComment)

module.exports = router;