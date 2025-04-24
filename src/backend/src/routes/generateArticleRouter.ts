// Imports Section: Import necessary modules and controllers
import { Router } from "express";
import { generateArticleController } from "../controllers/generateArticleController";

// Router Initialization Section: Create a new Router instance
const router = Router();

// POST Route Registration: Define route for '/generateArticle' with error handling
router.post("/generateArticle", (req, res, next) => {
  Promise.resolve(generateArticleController(req, res))
    .catch(next);
});

// Export Section: Export the router for use in the application
export default router;