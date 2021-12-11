const express = require("express");
const {
  createCountry,
  getAllCountry,
  createState
} = require('../controllers/Countries');

const router = express.Router();

router.post('/', createCountry);

router.get('/', getAllCountry);

router.post('/states', createState)

module.exports = router;
