import express from "express";
import gameRoutes from './routes/game.js';
import authRoutes from './routes/auth.js';
import scoreRoutes from './routes/score.js';
import cors from 'cors';
import bodyParser from "body-parser"; 
import cookieParser from "cookie-parser";

import path from "path";
const __dirname = path.resolve();
const FrontendPath = path.join(__dirname, "../Frontend/src");
const StaticAssetsPath = path.join(FrontendPath, "assets");

const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN
}))
// Middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(cookieParser())


app.use(express.static(FrontendPath));
app.use('/assets', express.static(StaticAssetsPath));

app.use('/', gameRoutes);
app.use('/welcome', authRoutes);
app.use('/score', scoreRoutes);

app.use((req, res) => {
  res.status(404).sendFile(path.join(FrontendPath, 'pages', "404.html"));
});

export default app;    
