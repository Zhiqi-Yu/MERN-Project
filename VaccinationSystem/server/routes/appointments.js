const express = require("express");
const mongoose = require("mongoose");
const Appointment = require("../models/Appointment");
const HospitalVaccine = require("../models/HospitalVaccine");
const router = express.Router();

// POST /api/appointments
router.post("/", async (req, res) => {
  try {
    const { hospitalId, vaccineId, scheduledAt, userId } = req.body;
    if (!hospitalId || !vaccineId || !scheduledAt) {
      return res.status(400).json({ error: "hospitalId / vaccineId / scheduledAt required" });
    }
    if (!mongoose.isValidObjectId(hospitalId) || !mongoose.isValidObjectId(vaccineId)) {
      return res.status(400).json({ error: "invalid ids" });
    }

    // 关键：原子条件更新，只有 stock>0 时才扣减
    const hv = await HospitalVaccine.findOneAndUpdate(
      { hospitalId, vaccineId, stock: { $gt: 0 } },
      { $inc: { stock: -1 } },
      { new: false } // 旧值即可，这里不需要新值
    ).lean();

    if (!hv) {
      return res.status(409).json({ error: "Out of stock" }); // 被并发抢光或本就为0
    }

    // 库存扣成功，再创建预约
    const doc = await Appointment.create({
      userId: userId || undefined,  // 兼容未登录/模拟登录
      hospitalId,
      vaccineId,
      scheduledAt,
      status: "Scheduled",
      paymentStatus: "Paid"
    });

    return res.status(201).json(doc);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "server error" });
  }
});

router.get("/slots", async (req, res) => {
  try {
    const { hospitalId, date } = req.query;
    if (!hospitalId || !mongoose.isValidObjectId(hospitalId)) {
      return res.status(400).json({ error: "invalid hospitalId" });
    }
    if (!date) return res.status(400).json({ error: "date required (YYYY-MM-DD)" });

    const start = new Date(`${date}T00:00:00Z`);
    const end   = new Date(`${date}T23:59:59Z`);

    const list = await Appointment.find({
      hospitalId,
      scheduledAt: { $gte: start, $lte: end }
    }).select("scheduledAt -_id").lean();

    // 返回 ISO 字符串数组
    res.json(list.map(x => new Date(x.scheduledAt).toISOString()));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "server error" });
  }
});

// GET /api/appointments?userId=
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const match = {};
    if (userId && mongoose.isValidObjectId(userId)) {
      match.userId = new mongoose.Types.ObjectId(userId);
    }

    const list = await Appointment.aggregate([
      { $match: match },
      { $lookup: { from: "hospitals", localField: "hospitalId", foreignField: "_id", as: "h" } },
      { $lookup: { from: "vaccines",  localField: "vaccineId",  foreignField: "_id", as: "v" } },
      { $unwind: { path: "$h", preserveNullAndEmptyArrays: true } },
      { $unwind: { path: "$v", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          scheduledAt: 1,
          status: 1,
          hospitalName: "$h.name",
          vaccineName: "$v.name",
        }
      },
      { $sort: { scheduledAt: 1 } }
    ]);

    res.json(list);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;
