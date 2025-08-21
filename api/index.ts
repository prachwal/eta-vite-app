import express from "express";
import router from "./routes";

const app = express();

// Middleware
app.use(express.json());

// CORS headers dla Vercel
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Use the API router under /api so incoming requests to /api/* match
app.use("/api", router);

// Uruchamiaj serwer tylko lokalnie
if (process.env.VERCEL !== "1") {
  // Catch-all handler dla nieistniejących endpointów
  app.use((req, res) => {
    res.status(404).json({
      status: false,
      error: {
        code: "NOT_FOUND",
        message: "Endpoint not found",
      },
    });
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
  });
}

// Export dla Vercel
export default app;
