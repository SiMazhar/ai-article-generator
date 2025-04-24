// src/services/generateArticleService.ts

import { generateArticleWithImages } from "./AiGenerateArticleService";

export interface GeneratedArticle {
  article: string;
  images: { prompt: string; url: string }[];
}

export const generateArticle = async (
  topic: string
): Promise<GeneratedArticle> => {
  // Use the integrated function to generate article and images
  const result = await generateArticleWithImages(topic);
  return {
    article: result.article,
    images: result.images.map(image => ({
      prompt: "Default prompt", // Use a default value since 'prompt' does not exist
      url: image.url,
    })),
  };
};

