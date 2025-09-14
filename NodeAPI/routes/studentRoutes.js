let express = require("express");
let studentRouter = express.Router();
let StudentModel = require("../datamodel/studentDataModel");

// 创建/保存学生
// POST /student/api/create
studentRouter.post("/api/create", (req, res) => {
  let body = req.body; // { studentName, studentCourses, courseProgress }
  let doc  = new StudentModel(body);

  doc.save()
    .then(saved => res.status(201).send(saved))
    .catch(err => {
      console.log("save student err", err);
      res.status(400).send("error while saving student");
    });
});

// 查询所有学生
// GET /student/api/list
studentRouter.get("/api/list", async (_req, res) => {
  const list = await StudentModel.find().sort({ createdAt: -1 });
  res.send(list);
});

module.exports = studentRouter;
