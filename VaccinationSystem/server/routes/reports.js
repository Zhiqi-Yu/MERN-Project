const express = require("express");
const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const Hospital = require("../models/Hospital");
const Vaccine = require("../models/Vaccine");

const router = express.Router();

// 工具：解析日期范围（含当日）
function parseRange(qs) {
  // ?start=YYYY-MM-DD&end=YYYY-MM-DD
  const now = new Date();
  const start = qs.start
    ? new Date(`${qs.start}T00:00:00Z`)
    : new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
  const end = qs.end
    ? new Date(`${qs.end}T23:59:59Z`)
    : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  return { start, end };
}

/**
 * GET /api/reports/by-vaccine?start=YYYY-MM-DD&end=YYYY-MM-DD
 * 返回各疫苗预约数量（包含 Scheduled/Completed）
 */
router.get("/by-vaccine", async (req, res) => {
  const { start, end } = parseRange(req.query);
  const data = await Appointment.aggregate([
    { $match: { scheduledAt: { $gte: start, $lte: end } } },
    { $group: { _id: "$vaccineId", count: { $sum: 1 } } },
    { $lookup: { from: "vaccines", localField: "_id", foreignField: "_id", as: "v" } },
    { $unwind: "$v" },
    { $project: { _id: 0, vaccineId: "$_id", vaccineName: "$v.name", type: "$v.type", count: 1 } },
    { $sort: { count: -1 } }
  ]);
  res.json(data);
});

/**
 * GET /api/reports/by-hospital?start=YYYY-MM-DD&end=YYYY-MM-DD
 * 返回各医院预约数量
 */
router.get("/by-hospital", async (req, res) => {
  const { start, end } = parseRange(req.query);
  const data = await Appointment.aggregate([
    { $match: { scheduledAt: { $gte: start, $lte: end } } },
    { $group: { _id: "$hospitalId", count: { $sum: 1 } } },
    { $lookup: { from: "hospitals", localField: "_id", foreignField: "_id", as: "h" } },
    { $unwind: "$h" },
    { $project: { _id: 0, hospitalId: "$_id", hospitalName: "$h.name", city: "$h.city", count: 1 } },
    { $sort: { count: -1 } }
  ]);
  res.json(data);
});

/**
 * GET /api/reports/daily?days=7
 * 返回最近 N 天的每日预约数量（画趋势）
 */
router.get("/daily", async (req, res) => {
  const days = Math.min(Math.max(parseInt(req.query.days || "7", 10), 1), 60);
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - (days - 1));
  const data = await Appointment.aggregate([
    { $match: { scheduledAt: { $gte: start, $lte: end } } },
    { $project: { d: { $dateToString: { format: "%Y-%m-%d", date: "$scheduledAt" } } } },
    { $group: { _id: "$d", count: { $sum: 1 } } },
    { $project: { _id: 0, date: "$_id", count: 1 } },
    { $sort: { date: 1 } }
  ]);

  // 补齐没有数据的日期
  const map = new Map(data.map(x => [x.date, x.count]));
  const out = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(start); d.setDate(start.getDate() + i);
    const key = d.toISOString().slice(0,10);
    out.push({ date: key, count: map.get(key) || 0 });
  }
  res.json(out);
});

module.exports = router;
