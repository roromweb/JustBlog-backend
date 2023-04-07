import { Router } from 'express';
const commentRoute = new Router();
import { checkAuth } from '../utils/checkAuth.js';
import { createComment } from '../controllers/comments.controller.js';


commentRoute.post('/:id', checkAuth, createComment);

export default commentRoute;
