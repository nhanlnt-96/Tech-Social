const CountryMessage = require('../models/CountryMessage');
const StateMessage = require('../models/StateMessage');
const mongoose = require('mongoose');

const createCountry = async (req, res) => {
  const countryInput = req.body;
  try {
    for (let i = 0; i < countryInput.length; i++) {
      const _id = new mongoose.Types.ObjectId();
      await new CountryMessage({
        _id,
        name: countryInput[i].name,
        phoneCode: countryInput[i].phone_code,
        region: countryInput[i].region,
        subregion: countryInput[i].subregion,
        flag: countryInput[i].emoji
      }).save();
    }
    res.status(201).json("Done");
  } catch (error) {
    res.status(400).json({ error: { error } });
  }
}

const getAllCountry = async (req, res) => {
  const response = await CountryMessage.aggregate([
    {
      $lookup: {
        from: 'states',
        localField: '_id',
        foreignField: 'countryId',
        as: 'States'
      }
    }
  ]);
  res.status(200).json(response)
}

const createState = async (req, res) => {
  const countryInput = req.body;
  try {
    for (let i = 0; i < countryInput.length; i++) {
      const countryFound = await CountryMessage.findOne({ phoneCode: countryInput[i].phone_code });
      for (let j = 0; j < countryInput[i].states.length; j++) {
        await new StateMessage({
          countryId: countryFound._id,
          stateCode: countryInput[i].states[j].state_code,
          name: countryInput[i].states[j].name
        }).save()
      }
    }
    res.status(201).json("Done");
  } catch (error) {
    res.status(400).json({ error: { error } });
  }
}

module.exports = { createCountry, getAllCountry, createState }
