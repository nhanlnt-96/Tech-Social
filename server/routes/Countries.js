const express = require("express");
const { createCountry, getAllCountry } = require('../controllers/Countries');

const router = express.Router();

router.post('/', createCountry);

router.get('/', getAllCountry);

module.exports = router;
