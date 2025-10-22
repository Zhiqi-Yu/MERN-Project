require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req,res)=>res.json({ok:true}));

app.use("/api/hospitals", require("./routes/hospitals"));
app.use("/api/vaccines", require("./routes/vaccines"));
app.use("/api/appointments", require("./routes/appointments"));

const PORT = process.env.PORT || 9002;
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/vaccination")
  .then(()=> console.log("MongoDB connected"))
  .catch(err => { console.error("MongoDB error:", err); process.exit(1); });

app.listen(PORT, ()=> console.log(`Server running http://localhost:${PORT}`));
