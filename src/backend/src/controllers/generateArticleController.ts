// src/controllers/generateArticleController.ts

import { Request, Response } from "express";
import { generateArticleWithImages } from "../services/AiGenerateArticleService";

export const generateArticleController = async (req: Request, res: Response) => {
  const { topic } = req.body;
  if (!topic) {
    return res.status(400).json({ error: "Missing 'topic' in request body." });
  }

  try {
    const result = await generateArticleWithImages(topic);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};