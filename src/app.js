import express from "express";
import cors from "cors";
import morgan from "morgan";
import insuranceRoutes from "./routes/insurance.routes.js";
import { logMiddleware } from "./middleware/logger.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(logMiddleware);

// routes
app.use("/api/insurance", insuranceRoutes);

// health
app.get("/health", (req, res) => res.json({ status: "ok" }));

export default app;