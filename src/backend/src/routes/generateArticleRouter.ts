import { Router } from "express";
import { generateArticleController } from "../controllers/generateArticleController";
import express from "express";

const router = Router();

router.post("/generate", (req, res, next) => {
  Promise.resolve(generateArticleController(req, res)).catch(next);
});
// Ensure 'app' is defined or imported

const app = express();

app.use("/api", router);

export default router;