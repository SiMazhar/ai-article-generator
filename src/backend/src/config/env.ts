// src/config/env.ts

import dotenv from "dotenv";

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  throw new Error("❌ OPENAI_API_KEY is missing in environment variables.");
}

export { OPENAI_API_KEY };
