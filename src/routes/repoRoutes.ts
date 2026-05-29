import express from "express";
import {
  fetchRepos,
  fetchBranches,
} from "../controllers/repoController.ts";

const router = express.Router();

router.get("/repos", fetchRepos);
router.get("/repos/:owner/:repo/branches", fetchBranches);

export default router;