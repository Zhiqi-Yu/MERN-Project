const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// 创建预约
// POST /api/appointments   body: { hospitalId, vaccineId, scheduledAt }
router.post("/", async (req, res) => {
  const { hospitalId, vaccineId, scheduledAt } = req.body || {};
  if (!hospitalId || !vaccineId || !scheduledAt) {
    return res.status(400).json({ error: "hospitalId, vaccineId, scheduledAt are required" });
  }
  const doc = await Appointment.create({ hospitalId, vaccineId, scheduledAt });
  res.status(201).json(doc);
});

// 我的预约列表（先不鉴权，全部列出，之后再按 userId 过滤）
router.get("/", async (req, res) => {
  const list = await Appointment.find().sort({ createdAt: -1 }).lean();
  res.json(list);
});

module.exports = router;
