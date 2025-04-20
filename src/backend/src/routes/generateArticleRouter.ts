import { Router } from "express";
import { generateArticleController } from "../controllers/generateArticleController";

const router = Router();

router.post("/generate", generateArticleController);

export default router;

