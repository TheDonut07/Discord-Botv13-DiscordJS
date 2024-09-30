const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  Guild: String,
  User: String,
  Day: Number,
  Month: Number,
  Birthday: String,
});

module.exports = mongoose.model("birthday", Schema);