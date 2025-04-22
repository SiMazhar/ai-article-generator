// src/app.ts

import express from "express";
import cors from "cors";
import generateArticleRouter from "./routes/generateArticleRouter";

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());
app.use("/api", generateArticleRouter); 

(async () => {
  const topic = "default topic"; // Define the topic variable
  const res = await fetch("http://localhost:5000/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });
})();

export default app;

// Added .listen() call
const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
