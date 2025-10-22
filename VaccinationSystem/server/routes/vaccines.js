const express = require("express");
const mongoose = require("mongoose");
const Vaccine = require("../models/Vaccine");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "Invalid vaccine id" });
  const doc = await Vaccine.findById(id).lean();
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.json(doc);
});

module.exports = router;
