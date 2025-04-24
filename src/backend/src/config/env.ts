// Import & Configuration: Import dotenv and configure environment variables
import dotenv from "dotenv";
dotenv.config();

// Retrieve OPENAI_API_KEY from environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Error handling: Ensure OPENAI_API_KEY is provided
if (!OPENAI_API_KEY) {
  throw new Error("❌ OPENAI_API_KEY is missing in environment variables.");
}

// Export OPENAI_API_KEY for use in the application
export { OPENAI_API_KEY };
