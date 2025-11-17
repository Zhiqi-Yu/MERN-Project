require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// OAuth step 1
const session = require('express-session'); 

const app = express();

// cross-domain
// app.use(cors());
// ---- CORS（Express v5 安全做法：用通用中间件 + 手动处理预检）----
const allowed = new Set([
  'http://localhost:3000',
  'http://localhost:5173',
]);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin || !allowed.has(origin)) return next();   // 不在白名单就让后续路由决定是否拒绝

  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // 预检直接结束
  }
  next();
});


app.use(express.json());

// OAuth step 2
app.use(session({
  secret: 'dev-secret',
  resave: false,
  saveUninitialized: true,
}));

app.get("/api/health", (_req,res)=>res.json({ok:true}));

app.use("/api/hospitals", require("./routes/hospitals"));
app.use("/api/vaccines", require("./routes/vaccines"));
app.use("/api/appointments", require("./routes/appointments"));
app.use("/api/users", require("./routes/users"));
app.use("/api/hospital-vaccines", require("./routes/hospitalVaccines"));
app.use("/api/reports", require("./routes/reports"));
app.use("/api/payments", require("./routes/payments"));

// OAuth step 3
app.use('/auth/github', require('./auth/github'));



const PORT = process.env.PORT || 9002;
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/vaccination")
  .then(()=> console.log("MongoDB connected"))
  .catch(err => { console.error("MongoDB error:", err); process.exit(1); });

app.listen(PORT, ()=> console.log(`Server running http://localhost:${PORT}`));
