const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");

const router = express.Router();

// GET /api/users  -> 列表
router.get("/", async (_req, res) => {
  const list = await User.find().sort({ role: 1, name: 1 }).lean();
  res.json(list);
});

// GET /api/users/:id  -> 详情
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "Invalid user id" });
  const doc = await User.findById(id).lean();
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.json(doc);
});

// POST /api/users  -> 新增简单用户 {name, role}
router.post("/", async (req, res) => {
  const { name, role } = req.body || {};
  if (!name) return res.status(400).json({ error: "name required" });
  const doc = await User.create({ name, role: role === "admin" ? "admin" : "user" });
  res.status(201).json(doc);
});

module.exports = router;
