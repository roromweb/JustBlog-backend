import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import postRouter from './routes/posts.route.js';
import commentRouter from './routes/comment.route.js';
import chalk from 'chalk';
import fileUpload from 'express-fileupload';
dotenv.config();
dbConnect();

//Constants
const app = express();
const PORT = process.env.PORT ?? 5000;

//NODE_ENV
const { NODE_ENV } = process.env;
console.log(chalk.magenta(NODE_ENV));

//Middlewares
app.use(cors());
// set config for POST form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static('uploads'));

//Routes

app.get('/', (req, res) => {
  return res.json({ message: 'working' });
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);
// Start the server.
app.listen(PORT, () => {
  console.log(chalk.blue('Server up and connecting on port', PORT));
});
