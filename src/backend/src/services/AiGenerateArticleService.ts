// src/services/AiGenerationService.ts

import { Configuration, OpenAIApi } from "openai"; // Updated import
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // API key loaded from .env file
});
const openai = new OpenAIApi(configuration); // Updated instantiation


export interface GeneratedImage {
  url: string;
  description: string;
}

export interface GeneratedArticle {
  article: string;
  images: GeneratedImage[];
}

/**
 * Generate an article and five illustrative images based on the topic.
 */
export async function generateArticleWithImages(
  topic: string
): Promise<GeneratedArticle> {
  // 1. Create the article via chat
  const articleResp = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are an expert writer." },
      { role: "user", content: `Write a detailed top five article about \"${topic}\".` }
    ],
    temperature: 0.7
  });
  const article = articleResp.data.choices?.[0]?.message?.content?.trim();
  if (!article) {
    throw new Error("Failed to generate article content.");
  }

  // 2. Ask GPT for five image captions instead of two
  const captionResp = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant that provides brief image captions." },
      { role: "user", content: `Provide five short captions, each on its own line, for illustrative images related to the article on \"${topic}\".` }
    ],
    temperature: 0.5
  });
  const rawCaptions = captionResp.data.choices?.[0]?.message?.content?.trim() ?? "";
  // Split lines and take the first five non-empty captions
  const captions = rawCaptions
    .split(/\r?\n/)         
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .slice(0, 5);

  // 3. Generate images for each caption (five images total)
  const images: GeneratedImage[] = [];
  for (const description of captions) {
    const imgResp = await openai.createImage({
      prompt: description,
      n: 1,
      size: "512x512"
    });
    images.push({
      url: imgResp.data.data[0].url!,
      description
    });
  }

  return { article, images };
}