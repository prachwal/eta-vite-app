import express from "express";
import router from "./routes";

const app = express();
app.use(express.json());

// Use the API router
app.use("/api", router);

export default app;
