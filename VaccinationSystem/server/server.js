require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 健康检查
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// 预留的最小路由（先返回空数组，之后接数据库）
app.get("/api/hospitals", (_req, res) => res.json([]));
app.get("/api/vaccines", (_req, res) => res.json([]));
app.get("/api/appointments", (_req, res) => res.json([]));

// 404 兜底
app.use((_req, res) => res.status(404).json({ error: "Not found" }));

const PORT = process.env.PORT || 9002;
app.listen(PORT, () => console.log(`Server running http://localhost:${PORT}`));
