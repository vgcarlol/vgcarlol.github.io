## Enlace en el servidor: https://arpanetos.lol/lab6/221164/

## API Documentation

```javascript
const express = require('express');
const {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/postController.js');

const router = express.Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve a list of all posts
 *     responses:
 *       200:
 *         description: A list of posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The post ID.
 *                   title:
 *                     type: string
 *                     description: The title of the post.
 *                   content:
 *                     type: string
 *                     description: The content of the post.
 */
router.get('/', getAllPosts);

/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Retrieve a post by its ID
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single post.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                     type: integer
 *                     description: The post ID.
 *                 title:
 *                     type: string
 *                     description: The title of the post.
 *                 content:
 *                     type: string
 *                     description: The content of the post.
 *       404:
 *         description: Post not found.
 */
router.get('/:postId', getPostById);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post.
 *               content:
 *                 type: string
 *                 description: The content of the post.
 *     responses:
 *       200:
 *         description: Post created successfully.
 */
router.post('/', createPost);

/**
 * @swagger
 * /posts/{postId}:
 *   put:
 *     summary: Update a post by its ID
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post.
 *               content:
 *                 type: string
 *                 description: The content of the post.
 *     responses:
 *       200:
 *         description: Post updated successfully.
 *       404:
 *         description: Post not found.
 */
router.put('/:postId', updatePost);

/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Delete a post by its ID
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Post deleted successfully.
 *       404:
 *         description: Post not found.
 */
router.delete('/:postId', deletePost);

module.exports = router;
