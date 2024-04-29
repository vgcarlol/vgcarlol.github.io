const db = require('./db');

const Post = {
  getAllPosts: (callback) => {
    db.query('SELECT * FROM posts', callback);
  },

  getPostById: (postId, callback) => {
    db.query('SELECT * FROM posts WHERE id = ?', [postId], callback);
  },

  createPost: (post, callback) => {
    const { title, content, image } = post;
    db.query('INSERT INTO posts (title, content, image) VALUES (?, ?, ?)', [title, content, image], callback);
  },

  updatePost: (postId, post, callback) => {
    const { title, content, image } = post;
    db.query('UPDATE posts SET title = ?, content = ?, image = ? WHERE id = ?', [title, content, image, postId], callback);
  },

  deletePost: (postId, callback) => {
    db.query('DELETE FROM posts WHERE id = ?', [postId], callback);
  }
};

module.exports = Post;
