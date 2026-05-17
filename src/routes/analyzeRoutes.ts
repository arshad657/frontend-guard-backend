import { Router } from 'express';
import { AnalyzeController } from '../controllers/analyzeController.ts';

const router = Router();

router.post('/', AnalyzeController.analyzeRepo);

export default router;
