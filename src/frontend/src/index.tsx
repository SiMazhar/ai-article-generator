// Import Section: import necessary modules and styles
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Root Creation & Render Section: create root and render the App component inside React.StrictMode
ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <React.StrictMode>
    {/* App Component rendering */}
    <App />
  </React.StrictMode>
);
