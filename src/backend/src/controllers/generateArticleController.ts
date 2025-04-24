// src/controllers/generateArticleController.ts

import { Request, Response } from "express"; // Import Express types
import { generateArticleWithImages } from "../services/AiGenerateArticleService"; // Import the service function

export const generateArticleController = async (req: Request, res: Response) => {
  // Input Validation: Ensure 'topic' exists in the request body
  const { topic } = req.body;
  if (!topic) {
    return res.status(400).json({ error: "Missing 'topic' in request body." });
  }

  try {
    // Business Logic: Generate article and images
    const result = await generateArticleWithImages(topic);
    // Response: Send generated result as JSON
    res.json(result);
  } catch (err) {
    // Error Handling: Log error and return HTTP 500 with error message
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};