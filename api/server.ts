import express from "express";
import router from "./routes";

const app = express();
app.use(express.json());

// Use the API router (routes contain full paths)
app.use(router);

export default app;
