// Import Section: Import necessary modules, styles, and App component
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Root Creation & Render Section: Create the root container and render the App component within StrictMode
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* App Component Rendering */}
    <App />
  </StrictMode>,
)
