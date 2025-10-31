const express = require("express");
const mongoose = require("mongoose");
const Payment = require("../models/Payment");
const Appointment = require("../models/Appointment");
const router = express.Router();

// 创建支付单
router.post("/", async (req,res)=>{
  const { appointmentId, amount } = req.body || {};
  if(!mongoose.isValidObjectId(appointmentId)) return res.status(400).json({error:"invalid appointmentId"});
  const appt = await Appointment.findById(appointmentId);
  if(!appt) return res.status(404).json({error:"appointment not found"});

  const pay = await Payment.create({
    appointmentId, amount: Number(amount)||0,
    qrText: `vacc://pay?pid=${new mongoose.Types.ObjectId()}`
  });
  res.status(201).json(pay);
});

// 查询支付单
router.get("/:id", async (req,res)=>{
  const pay = await Payment.findById(req.params.id).lean();
  if(!pay) return res.status(404).json({error:"not found"});
  res.json(pay);
});

// 确认支付（演示用，前端点击触发）
router.post("/:id/confirm", async (req,res)=>{
  const pay = await Payment.findByIdAndUpdate(req.params.id, { status:"paid" }, { new:true });
  if(!pay) return res.status(404).json({error:"not found"});
  // 顺手把预约状态从 Pending 改 Scheduled（如果你愿意）
  await Appointment.findByIdAndUpdate(pay.appointmentId, { status: "Scheduled" });
  res.json(pay);
});

module.exports = router;
