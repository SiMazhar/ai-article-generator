// src/services/AiGenerationService.ts

import { Configuration, OpenAIApi } from "openai"; // Updated import
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // API key loaded from .env file
});
const openai = new OpenAIApi(configuration); // Updated instantiation

export class AiGenerationService {
  /**
   * Generate a text article on a given topic.
   */
  static async generateArticle(topic: string): Promise<string> {
    const prompt = `Write a concise top ten article about "${topic}".`;
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });
    if (!completion.data.choices[0].message?.content) {
      throw new Error("The AI response content is null or undefined.");
    }
    return completion.data.choices[0].message.content;
  }

  /**
   * Stubbed image generation: returns one dummy URL
   * and a corresponding prompt.
   */
  static async generateImage(topic: string): Promise<{
    prompt: string;
    url: string;
  }> {
    const imagePrompt = `An illustrative photo related to ${topic}`;
    const dummyUrl = "https://example.com/dummy-image.jpg";
    return { prompt: imagePrompt, url: dummyUrl };
  }
}

