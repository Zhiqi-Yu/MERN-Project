const express = require("express");
const mongoose = require("mongoose");
const HospitalVaccine = require("../models/HospitalVaccine");

const router = express.Router();

// 列表：可按医院过滤  GET /api/hospital-vaccines?hospitalId=
// router.get("/", async (req, res) => {
//   const { hospitalId } = req.query;
//   const where = {};
//   if (hospitalId && mongoose.isValidObjectId(hospitalId)) where.hospitalId = hospitalId;

//   // 直接返回原始文档（前端再去 join 名字，或简单展示 id）
//   const list = await HospitalVaccine.find(where).sort({ createdAt: -1 }).lean();
//   res.json(list);
// });

router.get("/", async (req, res) => {
  const { hospitalId } = req.query;
  const match = {};
  if (hospitalId && mongoose.isValidObjectId(hospitalId)) {
    match.hospitalId = new mongoose.Types.ObjectId(hospitalId);
  }

  const rows = await mongoose.connection.collection("hospitalvaccines").aggregate([
    { $match: match },
    { $lookup: { from: "hospitals", localField: "hospitalId", foreignField: "_id", as: "h" } },
    { $lookup: { from: "vaccines",  localField: "vaccineId",  foreignField: "_id", as: "v" } },
    { $unwind: { path: "$h", preserveNullAndEmptyArrays: true } },
    { $unwind: { path: "$v", preserveNullAndEmptyArrays: true } },
    { $project: {
        _id: 1,
        hospitalId: 1,
        vaccineId: 1,
        stock: { $ifNull: ["$stock", 0] },
        chargeOverride: 1,
        hospitalName: "$h.name",
        city: "$h.city",
        vaccineName: "$v.name",
        vaccineType: "$v.type",
        basePrice: "$v.price",
        finalPrice: { $cond: [ { $gt: ["$chargeOverride", null] }, "$chargeOverride", "$v.price" ] }
    } }
  ]).toArray();

  res.json(rows);
});




// 上架：POST /api/hospital-vaccines  { hospitalId, vaccineId, stock, chargeOverride? }
// 增量上架：对已有记录累加库存；不存在则创建一条
router.post("/", async (req, res) => {
  const { hospitalId, vaccineId, stock } = req.body || {};
  const addStock = Number(stock) || 0;
  if (!hospitalId || !vaccineId) return res.status(400).json({ error: "hospitalId & vaccineId required" });
  if (addStock <= 0) return res.status(400).json({ error: "stock must be > 0" });

  // upsert + 累加
  const doc = await HospitalVaccine.findOneAndUpdate(
    { hospitalId, vaccineId },
    { $inc: { stock: addStock } },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  // （可选）把名字/价格也一起返回，前端可直接刷新列表
  const enriched = await mongoose.connection.collection("hospitalvaccines")
    .aggregate([
      { $match: { _id: doc._id } },
      { $lookup: { from: "hospitals", localField: "hospitalId", foreignField: "_id", as: "h" } },
      { $lookup: { from: "vaccines",  localField: "vaccineId",  foreignField: "_id", as: "v" } },
      { $unwind: "$h" }, { $unwind: "$v" },
      { $project: {
          _id: 1,
          hospitalId: 1, vaccineId: 1,
          stock: { $ifNull: ["$stock", 0] },
          chargeOverride: 1,
          hospitalName: "$h.name", city: "$h.city",
          vaccineName: "$v.name", vaccineType: "$v.type",
          basePrice: "$v.price",
          finalPrice: { $cond: [{ $gt: ["$chargeOverride", null] }, "$chargeOverride", "$v.price"] }
      } }
    ]).toArray();

  return res.status(201).json(enriched[0] || doc);
});


// 更新库存/价格：PATCH /api/hospital-vaccines/:id  { stock?, chargeOverride? }
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "Invalid id" });
  const { stock, chargeOverride } = req.body || {};
  const payload = {};
  if (stock != null) payload.stock = Number(stock);
  if (chargeOverride != null) payload.chargeOverride = Number(chargeOverride);
  const doc = await HospitalVaccine.findByIdAndUpdate(id, payload, { new: true });
  if (!doc) return res.status(404).json({ error: "Not found" });
  res.json(doc);
});

module.exports = router;
