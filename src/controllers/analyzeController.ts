import type { Request, Response } from 'express';
import { AnalyzeModel } from "../models/analyzeModel.ts";

export class AnalyzeController {
  static async analyzeRepo(req: Request, res: Response) {
    const owner = req.body?.owner;
    const repo = req.body?.repo;
    const branch = req.body?.branch;

    if (!owner) {
      return res.status(400).json({ error: "Owner data is missing" });
    }else if (!repo) {
      return res.status(400).json({ error: "Repo data is missing" });
    }else if (!branch) {
      return res.status(400).json({ error: "Branch data is missing" });
    }

    try {
      const result = await AnalyzeModel.analyzeUrl({owner, repo, branch});
      res.json({
        success: true,
        ...result
      });
    } catch (error: any) {
      if (error.message === "Invalid url" || error.message.includes("Could not extract owner")) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message || "Failed to analyze repository" });
    }
  }
}
