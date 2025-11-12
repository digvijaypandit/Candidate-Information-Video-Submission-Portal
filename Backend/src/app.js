import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import candidateRoutes from "./routes/candidate.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();

app.use(express.json());

// Enable CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*", // fallback to allow all origins in dev
  })
);

// Mount routes
app.use("/api/candidate", candidateRoutes);

app.get("/", (_req, res) => {
  res.status(200).send("Server is running!");
});

// Global error handler
app.use(errorHandler);

export default app;
