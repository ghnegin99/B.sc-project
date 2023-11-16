import express from "express";
import { json } from "body-parser";
import "express-async-errors";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { DatabaseConnectionError } from "./errors/database-connection-error";

import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

require("dotenv").config();

// Import routes
import userRoutes from "./routes/user_routes";
import authRoutes from "./routes/auth_routes";
import rangeRoutes from "./routes/range_routes";
import videoRoutes from "./routes/video_routes";
import dietRoutes from "./routes/diet_routes";

// Initialize App
const app = express();

app.use(json());
app.use(morgan("common"));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/videos", express.static(path.join(__dirname, "../public/videos")));
app.use(
  "/thumbnails",
  express.static(path.join(__dirname, "../public/thumbnails"))
);

// Initialize Routes
app.get('/', (req,res) => {
  res.send({
    App: 'MyHealth',
    Url: __dirname,
    Developer: 'Negin Ghasemi',
    Description: 'Developed by <3'

  })
})
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ranges", rangeRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/diets", dietRoutes);

// Error handler
app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

// Connect app to MongoDB
if (!process.env.MONGO_URI) {
  throw new Error("خطا در اتصال به پایگاه داده");
}

mongoose.connect(process.env.MONGO_URI, {}, (err) => {
  console.log("Connecting to MongoDB");
  if (err) {
    throw new DatabaseConnectionError(err);
  }
});

// Initialize port | Get from ENV file
const PORT = process.env.APP_PORT || 3000;

// Run App
app.listen(PORT, () => {
  console.log(`App listen on Port ${PORT}`);
});
