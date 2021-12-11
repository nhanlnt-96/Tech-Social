const mongoose = require("mongoose");

const CountryMessage = mongoose.model(
  "Countries",
  mongoose.Schema({
    _id: {
      type: mongoose.Types.ObjectId,
      ref: 'States',
      require: true
    },
    name: {
      type: String,
      require: true
    },
    phoneCode: {
      type: String,
      require: true
    },
    region: {
      type: String,
      require: true
    },
    subregion: {
      type: String,
      require: true
    },
    flag: {
      type: String,
      require: true
    }
  })
);

module.exports = CountryMessage;
