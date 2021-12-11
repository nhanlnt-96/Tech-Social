const mongoose = require('mongoose');
const CountryMessage = require('../models/CountryMessage');


const createCountry = async (req, res) => {
  const _id = new mongoose.Types.ObjectId();
  const countryInput = req.body;

  try {
    countryInput.map(async (val) => {
      await new CountryMessage({
        _id,
        name: val.name,
        phoneCode: val.phone_code,
        region: val.region,
        subregion: val.subregion,
        flag: val.emoji
      })
    });
    res.status(201).json("Done");
  } catch (error) {
    res.status(400).json({ error: { error } });
  }
}

const getAllCountry = async (req, res) => {
  const response = await CountryMessage.find();
  res.status(200).json(response)
}

module.exports = { createCountry,getAllCountry }
