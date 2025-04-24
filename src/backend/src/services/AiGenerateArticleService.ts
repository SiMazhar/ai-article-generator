// src/services/AiGenerationService.ts

/* Imports & Environment Configuration */
import { Configuration, OpenAIApi } from "openai"; // Updated import
import dotenv from "dotenv";
dotenv.config();

/* Setup OpenAI Configuration and Instance */
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // API key loaded from .env file
});
const openai = new OpenAIApi(configuration); // Updated instantiation

/* Interfaces: Define types for generated images and articles */
export interface GeneratedImage {
  url: string;
  description: string;
}

export interface GeneratedArticle {
  article: string;
  images: GeneratedImage[];
}

/* 
   Function: generateArticleWithImages
   Purpose: Generate an article and five illustrative images based on the topic.
*/
export async function generateArticleWithImages(
  topic: string
): Promise<GeneratedArticle> {
  /* Step 1: Generate the article via chat */
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

  /* Step 2: Generate five image captions */
  const captionResp = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant that provides brief image captions." },
      { role: "user", content: `Provide five short captions, each on its own line, for illustrative images related to the article on \"${topic}\".` }
    ],
    temperature: 0.5
  });
  const rawCaptions = captionResp.data.choices?.[0]?.message?.content?.trim() ?? "";
  // Process captions: split lines, trim, filter non-empty, and pick first five
  const captions = rawCaptions
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .slice(0, 5);

  /* Step 3: Generate an image for each caption */
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

  /* Return generated article and images */
  return { article, images };
}