import express from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import {
  createPost,
  getAllPosts,
  getById,
  getMyPosts,
  removePost,
  updatePosts,
  getPostComments,
} from '../controllers/posts.controller.js';
const postRouter = new express.Router();


postRouter.post('/', checkAuth, createPost);

postRouter.get('/', getAllPosts);

postRouter.get('/:id', getById);

postRouter.get('/user/me', checkAuth, getMyPosts);


postRouter.delete('/:id', checkAuth, removePost);


postRouter.put('/:id', checkAuth, updatePosts);

postRouter.get('/comments/:id', getPostComments);
export default postRouter;
