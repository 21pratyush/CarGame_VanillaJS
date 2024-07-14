import express from 'express'
import path from 'path';
import { addScore, getUserScore, getAllUserScores } from '../controllers/scoreControllers.js';
import { verifyJWT } from '../middlewares/auth.middlewate.js';

const router = express.Router();
const __dirname = path.resolve();
const FrontendPath = path.join(__dirname, '../Frontend/src');

router.get('/leaderBoard', (req, res) => {
    res.sendFile(path.join(FrontendPath, 'pages', 'leaderBoard.html'));
});

router.post('/add', addScore);

router.get('/getScore', verifyJWT, getUserScore);

router.get('/getLeaderBoardScore', getAllUserScores);


export default router; 