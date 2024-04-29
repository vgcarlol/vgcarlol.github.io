const express = require('express');
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('./PostController');

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:postId', getPostById);
router.post('/', createPost);
router.put('/:postId', updatePost);
router.delete('/:postId', deletePost);

module.exports = router;
