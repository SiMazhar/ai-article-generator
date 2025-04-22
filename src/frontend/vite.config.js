import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  root: __dirname, // explicitly set the root to the frontend folder
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    } // added missing closing brace for alias
  } // added missing closing brace for resolve
}) // added missing closing parenthesis for defineConfig
