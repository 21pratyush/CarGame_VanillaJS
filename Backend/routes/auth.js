import express from 'express';
import path from 'path';
import { loginUser, registerUser, logoutUser } from '../controllers/userControllers.js';
import { verifyJWT } from '../middlewares/auth.middlewate.js';

const router = express.Router();
const __dirname = path.resolve();
const FrontendPath = path.join(__dirname, '../Frontend/src');

router.get('/', (req, res) => {
    res.sendFile(path.join(FrontendPath, 'pages', 'welcome.html'));
});

// Registration route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

//Logout route
router.post('/logout', verifyJWT, logoutUser);


export default router;