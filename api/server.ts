import express from "express";
import router from "./routes";

const app = express();

// Middleware
app.use(express.json());

// Basic CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Use the API router
app.use("/api", router);

// 404 handler - bez wildcardów
app.use((req, res) => {
  res.status(404).json({
    status: false,
    error: {
      code: "NOT_FOUND",
      message: `Endpoint ${req.method} ${req.path} not found`,
    },
  });
});

export default app;
