// src/app.ts

import express from "express";
import cors from "cors";
import generateArticleRouter from "./routes/generateArticleRouter";

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Mount routes
app.use("/api", generateArticleRouter);

export default app;

// Added .listen() call
const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
