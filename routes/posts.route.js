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

// Create Post
// http://localhost:3002/api/posts
postRouter.post('/', checkAuth, createPost);
// Get All Posts
// http://localhost:3002/api/posts
postRouter.get('/', getAllPosts);
// Get Post By Id
// http://localhost:3002/api/posts/:id
postRouter.get('/:id', getById);

// Get My Posts
// http://localhost:3002/api/posts/user/me
postRouter.get('/user/me', checkAuth, getMyPosts);

//Delete posts
// http://localhost:3002/api/posts/:id
postRouter.delete('/:id', checkAuth, removePost);

// Update Post
// http://localhost:3002/api/posts/:id
postRouter.put('/:id', checkAuth, updatePosts);

// Get Post Comments
// http://localhost:3002/api/posts/comments/:id
postRouter.get('/comments/:id', getPostComments);
export default postRouter;
