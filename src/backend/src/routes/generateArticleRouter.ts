// src/backend/src/routes/generateArticleRouter.ts
import { Router } from "express";
import { generateArticleController } from "../controllers/generateArticleController";

const router = Router();

router.post("/generateArticle", (req, res, next) => {
  Promise.resolve(generateArticleController(req, res))
    .catch(next);
});

export default router;