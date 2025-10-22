const { Schema, model, Types } = require("mongoose");
module.exports = model("HospitalVaccine", new Schema({
  hospitalId: { type: Types.ObjectId, ref: "Hospital" },
  vaccineId:  { type: Types.ObjectId, ref: "Vaccine" },
  stock: Number,
  chargeOverride: Number
}, { timestamps: true }));
