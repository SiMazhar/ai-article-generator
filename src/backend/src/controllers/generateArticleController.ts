// src/controllers/generateArticleController.ts

import { Request, Response, NextFunction } from "express";
import { generateArticle } from "../services/generateArticleService";

export const generateArticleController = async (req: Request, res: Response) => {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Missing 'topic'." });
    }
    try {
      const result = await generateArticle(topic);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };