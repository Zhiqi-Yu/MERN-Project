// server/routes/vaccines.js
const express = require("express");
const mongoose = require("mongoose");
const Vaccine = require("../models/Vaccine");

const router = express.Router();

// 精简列表：id + name + type + price（给下拉）
router.get("/mini", async (_req, res) => {
  const list = await Vaccine.find({}, { name: 1, type: 1, price: 1 })
    .sort({ name: 1 })
    .lean();
  res.json(list);
});

// （可选）按 id 获取
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "Invalid vaccine id" });
  const doc = await Vaccine.findById(id).lean();
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.json(doc);
});

// 新增“疫苗品类”（不是上架库存）
router.post("/", async (req, res) => {
  const { name, type, price, dosesRequired } = req.body || {};
  if (!name) return res.status(400).json({ error: "name required" });

  const doc = await Vaccine.create({
    name,
    type: type || "Unknown",
    price: Number(price) || 0,
    dosesRequired: Number.isFinite(+dosesRequired) ? +dosesRequired : 1,
  });

  return res.status(201).json(doc);
});

module.exports = router;
