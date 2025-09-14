let mongoose = require("mongoose");
let schemaObj = mongoose.Schema;

// 如果你已经在别处 connect 了，就别再连；
// 老师的风格是每个 model 文件里都连一次，这里也给出（二选一）
// mongoose.connect("mongodb://127.0.0.1:27017/mern_demo");

let studentSchema = new schemaObj({
  studentName:     { type: String, required: true },
  studentCourses:  { type: [String], default: [] },
  courseProgress:  { type: Number, default: 0, min: 0, max: 100 }
}, { versionKey: false });

let StudentModel = mongoose.model("student", studentSchema);
module.exports = StudentModel;

console.log("MongoDB connection with student datamodel is established!!");
