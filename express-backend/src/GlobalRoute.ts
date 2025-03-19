import express from "express";
import productRoutes from "./routes/ProductRoutes";
import authRoutes from "./routes/AuthRoutes";
const GlobalRouter = express();

GlobalRouter.use("/products", productRoutes);
GlobalRouter.use("/auth", authRoutes);
export default GlobalRouter;
