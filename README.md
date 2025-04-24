
# Article Generator

## Overview
This project is an AI-powered article generator that produces a "Top Five" article along with associated images using AI services. The frontend is built with React while the backend uses Node.js with Express.

## Features
- Generate detailed "top five" articles about a given topic.
- Generate illustrative images corresponding to the article content.
- Automatic text processing and dynamic display.
- Uses AI APIs for content and image generation.
- Built-in error handling and loading states.

## Setup
1. **Clone the repository** to your local machine.
2. **Install dependencies** for both frontend and backend:
   - Frontend: Run `npm install` in the `src/frontend` folder.
   - Backend: Run `npm install` in the `src/backend` folder.
3. **Configure Environment Variables**:
   - Create a `.env` file in the backend folder and add:
     ```
     OPENAI_API_KEY=your_openai_api_key
     PORT=5000
     ```
4. **Run the application**:
   - Start the backend server: `npm run start` (or use `ts-node` if applicable).
   - Start the frontend: `npm run dev` (if using Vite).

## Linting
The project uses ESLint and Prettier for code formatting.
- To run lint: `npx eslint .`

## Usage
Open your browser and go to `http://localhost:3000` (or the configured port) to interact with the article generator in the frontend.
