const { Schema, model } = require("mongoose");
module.exports = model("Hospital", new Schema({
  name: String, city: String, address: String, type: String
}, { timestamps: true }));
