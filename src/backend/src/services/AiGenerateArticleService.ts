// src/services/AiGenerationService.ts

import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export class AiGenerationService {
  /**
   * Generate a text article on a given topic.
   */
  static async generateArticle(topic: string): Promise<string> {
    const prompt = `Write a concise top ten article about "${topic}".`;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });
    if (!completion.choices[0].message.content) {
      throw new Error("The AI response content is null or undefined.");
    }
    return completion.choices[0].message.content;
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
    // In future: call openai.images.generate(...)
    const dummyUrl = "https://example.com/dummy-image.jpg";
    return { prompt: imagePrompt, url: dummyUrl };
  }
}

  