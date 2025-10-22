const { Schema, model, Types } = require("mongoose");

const AppointmentSchema = new Schema(
  {
    userId: Types.ObjectId,                // 先不做用户系统，可留空
    hospitalId: { type: Types.ObjectId, ref: "Hospital", required: true },
    vaccineId:  { type: Types.ObjectId, ref: "Vaccine",  required: true },
    scheduledAt: { type: Date, required: true },
    status: { type: String, default: "Scheduled" },      // Scheduled | Completed | Cancelled
    paymentStatus: { type: String, default: "Paid" }     // 先直接记为 Paid
  },
  { timestamps: true }
);

module.exports = model("Appointment", AppointmentSchema);
