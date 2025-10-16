import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todo.routes";
import pool from "./config/database";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Todo List API is running",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/todos", todoRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  pool.end(() => {
    console.log("Database pool closed");
    process.exit(0);
  });
});
