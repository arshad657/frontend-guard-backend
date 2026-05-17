import type { Request, Response } from 'express';
import { AnalyzeModel } from "../models/analyzeModel.ts";

export class AnalyzeController {
  static async analyzeRepo(req: Request, res: Response) {
    const url = req.body?.url || req.query?.url;
    
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: "Missing url parameter" });
    }

    try {
      const result = await AnalyzeModel.analyzeUrl(url);
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
