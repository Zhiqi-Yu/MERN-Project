// server/routes/hospitals.js
const express = require("express");
const mongoose = require("mongoose");
const Hospital = require("../models/Hospital");

const router = express.Router();

/**
 * GET /api/hospitals?city=&q=
 * 按城市与名称关键字查询医院
 */
router.get("/", async (req, res) => {
  const { city, q } = req.query;
  const where = {};
  if (city) where.city = new RegExp(`^${city}$`, "i");
  if (q) where.name = new RegExp(q, "i");

  const list = await Hospital.find(where).sort({ name: 1 }).lean();
  res.json(list);
});

// 精简：只返回 id + name + city，用于下拉
router.get("/mini", async (_req, res) => {
  const list = await mongoose.connection
    .collection("hospitals")
    .aggregate([{ $project: { _id: 1, name: 1, city: 1 } }, { $sort: { name: 1 } }])
    .toArray();
  res.json(list);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "Invalid hospital id" });
  const doc = await Hospital.findById(id).lean();
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.json(doc);
});

/**
 * GET /api/hospitals/:id/vaccines
 * 返回该医院上架的疫苗（含库存/价格/剂次数）
 * 说明：用聚合 $lookup 直接连表，避免 populate 配置不一致的问题
 */
router.get("/:id/vaccines", async (req, res) => {
  const { id } = req.params;

  // 基础校验（不使用 try/catch）
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: "Invalid hospital id" });
  }

  const hospitalObjectId = new mongoose.Types.ObjectId(id);

  // 注意集合名是小写复数：hospitalvaccines / vaccines
  const rows = await mongoose.connection
    .collection("hospitalvaccines")
    .aggregate([
      { $match: { hospitalId: hospitalObjectId } },
      {
        $lookup: {
          from: "vaccines",
          localField: "vaccineId",
          foreignField: "_id",
          as: "v"
        }
      },
      { $unwind: { path: "$v", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          stock: { $ifNull: ["$stock", 0] },
          chargeOverride: 1,
          vaccine: {
            id: "$v._id",
            name: "$v.name",
            type: "$v.type",
            dosesRequired: "$v.dosesRequired",
            basePrice: "$v.price"
          },
          price: {
            $cond: [
              { $gt: ["$chargeOverride", null] },
              "$chargeOverride",
              "$v.price"
            ]
          }
        }
      }
    ])
    .toArray();

  res.json(rows);
});

module.exports = router;
