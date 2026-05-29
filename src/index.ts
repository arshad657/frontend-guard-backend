import express from "express";
import cors from "cors";
import { env } from "./config/env.ts";

import authRoutes from "./routes/authRoutes.ts";
import repoRoutes from "./routes/repoRoutes.ts";
import analyzeRoutes from "./routes/analyzeRoutes.ts";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/api", repoRoutes);
app.use("/api/analyze", analyzeRoutes);

// Health check
app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${env.PORT}`);
});