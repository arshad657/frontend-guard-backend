import express from "express";
import {
  githubLogin,
  githubCallback,
  getGithubStatus,
} from "../controllers/authController.ts";

const router = express.Router();

router.get("/github", githubLogin);
router.get("/github/callback", githubCallback);
router.get("/status", getGithubStatus);

export default router;