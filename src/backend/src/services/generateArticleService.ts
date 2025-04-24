// src/services/generateArticleService.ts

import { generateArticleWithImages } from "./AiGenerateArticleService";

// Interface: GeneratedArticle - structure for generated article and images
export interface GeneratedArticle {
  article: string;
  images: { prompt: string; url: string }[];
}

// Function: generateArticle - integrates article and image generation
export const generateArticle = async (
  topic: string
): Promise<GeneratedArticle> => {
  // Call service function to generate article and images
  const result = await generateArticleWithImages(topic);
  return {
    // Article section: returns generated article text
    article: result.article,
    // Images section: Map images to include a default prompt value
    images: result.images.map(image => ({
      prompt: "Default prompt", // Default prompt used as placeholder
      url: image.url,
    })),
  };
};

