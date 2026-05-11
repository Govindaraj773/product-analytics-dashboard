import express from "express";
import cors from "cors";

import uploadRoutes from "./routes/uploadRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/upload", uploadRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Product Analytics Dashboard API!");
});

export default app;
