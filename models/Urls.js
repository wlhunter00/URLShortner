const mongoose = require("mongoose");
const shortID = require("shortID");

const urlsSchema = mongoose.Schema({
  fullU: {
    type: String,
    required: true
  },
  shortU: {
    type: String,
    required: true,
    default: shortID.generate()
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model("Urls", urlsSchema);
