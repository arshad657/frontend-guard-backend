import { Router } from 'express';
import { AnalyzeController } from '../controllers/analyzeController.ts';

const router = Router();

router.get('/', AnalyzeController.analyzeRepo);

export default router;
