// File: src/app.ts
// src/backend/src/app.ts
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import generateArticleRouter from "./routes/generateArticleRouter";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

// Mount the router
app.use("/api", generateArticleRouter);


console.log("↪ About to call listen on port", PORT);

// Start listening
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
