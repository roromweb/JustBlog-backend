import express from 'express';
import regController from '../controllers/auth.controller.js';
import { checkAuth } from '../utils/checkAuth.js';

const authRouter = new express.Router();

//Register
authRouter.post(
  '/register',

  regController.register
);
//Login
authRouter.post('/login', regController.login);
//Get Me
authRouter.get('/me', checkAuth, regController.getMe);
export default authRouter;
