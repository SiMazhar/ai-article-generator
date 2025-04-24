// File: src/app.ts
// src/backend/src/app.ts

// dotenv configuration and core imports
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import generateArticleRouter from "./routes/generateArticleRouter";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Middleware Configuration: Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Router Mounting: Mount generateArticleRouter on '/api'
app.use("/api", generateArticleRouter);

console.log("↪ About to call listen on port", PORT);

// Server Startup: Start listening on configured PORT and network interface
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
