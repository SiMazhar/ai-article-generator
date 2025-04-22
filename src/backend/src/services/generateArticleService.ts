// src/services/generateArticleService.ts

import { AiGenerationService } from "./AiGenerateArticleService";

export interface GeneratedArticle {
  article: string;
  images: { prompt: string; url: string }[];
}

export const generateArticle = async (
  topic: string
): Promise<GeneratedArticle> => {
  const article = await AiGenerationService.generateArticle(topic);
  const image = await AiGenerationService.generateImage(topic);
  return {
    article,
    images: [image],  // for now just one
  };
};

