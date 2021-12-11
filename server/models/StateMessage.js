const mongoose = require("mongoose");

const StateMessage = mongoose.model(
  "States",
  mongoose.Schema({
    name: {
      type: String,
      require: true
    },
    stateCode: {
      type: String,
      require: true
    },
    countryId: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref:'Countries'
    }
  })
);

module.exports = StateMessage;
