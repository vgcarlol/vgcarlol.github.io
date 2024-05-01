const pool = require('../utils/db');

// Obtener todos los posts
exports.getAllPosts = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM posts');
        res.status(200).json(results.rows);
    } catch (error) {
        console.error('Error fetching all posts:', error.stack);  // Usar error.stack para obtener el traceback completo
        res.status(500).json({ error: 'Error in the database', details: error.message });
    }
};

// Obtener un post por ID
exports.getPostById = async (req, res) => {
    const id = parseInt(req.params.postId);
    try {
        const results = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
        if (results.rows.length > 0) {
            res.status(200).json(results.rows[0]);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error(`Error fetching post with id ${id}:`, error.stack);
        res.status(500).json({ error: 'Error in the database', details: error.message });
    }
};

// Crear un nuevo post
exports.createPost = async (req, res) => {
    const { title, content, image } = req.body;
    try {
        const results = await pool.query('INSERT INTO posts (title, content, image) VALUES ($1, $2, $3) RETURNING *', [title, content, image]);
        res.status(201).json(results.rows[0]);
    } catch (error) {
        console.error('Error creating post:', error.stack);
        res.status(500).json({ error: 'Error in the database', details: error.message });
    }
};

// Modificar un post existente
exports.updatePost = async (req, res) => {
    const id = req.params.postId;
    const { title, content, image } = req.body;
    try {
        const results = await pool.query('UPDATE posts SET title = $1, content = $2, image = $3 WHERE id = $4 RETURNING *', [title, content, image, id]);
        if (results.rows.length > 0) {
            res.status(200).json(results.rows[0]);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error(`Error updating post with id ${id}:`, error.stack);
        res.status(500).json({ error: 'Error in the database', details: error.message });
    }
};

// Borrar un post
exports.deletePost = async (req, res) => {
    const id = req.params.postId;
    try {
        const results = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
        if (results.rows.length > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error(`Error deleting post with id ${id}:`, error.stack);
        res.status(500).json({ error: 'Error in the database', details: error.message });
    }
};
