const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    // 先不做登录体系，后续需要再加 email/password 等
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
