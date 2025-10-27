const express = require("express");
const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const router = express.Router();

// POST /api/appointments
router.post("/", async (req, res) => {
  const { hospitalId, vaccineId, scheduledAt, userId } = req.body || {};
  if (!hospitalId || !vaccineId || !scheduledAt) {
    return res.status(400).json({ error: "hospitalId, vaccineId, scheduledAt are required" });
  }

  const payload = { hospitalId, vaccineId, scheduledAt };
  // 只有是合法 ObjectId 才写入 userId（否则省略）
  if (userId && mongoose.isValidObjectId(userId)) {
    payload.userId = userId;
  }

  const doc = await Appointment.create(payload);
  res.status(201).json(doc);
});

// GET /api/appointments?userId=
router.get("/", async (req, res) => {
  const { userId } = req.query;
  const where = {};
  if (userId && mongoose.isValidObjectId(userId)) {
    where.userId = userId;
  }
  const list = await Appointment.find(where).sort({ createdAt: -1 }).lean();
  res.json(list);
});

module.exports = router;
