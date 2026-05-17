import express from 'express';
import analyzeRoutes from './routes/analyzeRoutes.ts';

const app = express();
app.use(express.json());

app.use('/api/analyze', analyzeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
