const { Schema, model, Types } = require("mongoose");

const PaymentSchema = new Schema({
  appointmentId: { type: Types.ObjectId, ref: "Appointment", required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["unpaid","paid"], default: "unpaid" },
  qrText: { type: String }, // 例如 vacc://pay?pid=xxx
}, { timestamps: true });

module.exports = model("Payment", PaymentSchema);
