const { Schema, model } = require("mongoose");
module.exports = model("Vaccine", new Schema({
  name: String, type: String, price: Number, dosesRequired: Number
}, { timestamps: true }));
