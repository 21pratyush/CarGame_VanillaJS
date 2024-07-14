import express from 'express';
import path from 'path';

const router = express.Router();
const __dirname = path.resolve();
const FrontendPath = path.join(__dirname, '../Frontend/src');

router.get('/', (req, res) => {
  res.sendFile(path.join(FrontendPath, 'index.html'));
});

export default router;
