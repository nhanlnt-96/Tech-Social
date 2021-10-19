const express = require('express');
const {validateToken} = require('../JWT/jwt');
const {likeSystem} = require('../controllers/Likes');

const router = express.Router();

// like
router.post('/', validateToken, likeSystem);

module.exports = router;