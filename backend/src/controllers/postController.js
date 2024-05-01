const db = require('../utils/db.js')

// Obtener todos los posts
exports.getAllPosts = (req, res) => {
    db.query('SELECT * FROM posts', (error, results) => {
        if (error) {
            return res.status(500).send('Error in the database')
        }
        res.status(200).json(results)
    })
}

// Obtener un post por ID
exports.getPostById = (req, res) => {
    const id = req.params.postId;
    db.query('SELECT * FROM posts WHERE id = $1', [id], (error, results) => {
        if (error) {
            return res.status(500).send('Error in the database');
        }
        if (results.rows.length > 0) {
            res.status(200).json(results.rows[0]);
        } else {
            res.status(404).send('Post not found');
        }
    });
};

// Crear un nuevo post
exports.createPost = (req, res) => {
    const { title, content } = req.body; // Removed 'image' from the destructured object
    db.query('INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *', [title, content], (error, results) => {
        if (error) {
            console.error('Database error:', error); // Log the error for more details
            return res.status(500).send('Error in the database: ' + error.message);
        }
        res.status(201).json(results.rows[0]); // Utilizar RETURNING * para obtener el post creado y devolverlo en la respuesta
    });
};


// Modificar un post existente
exports.updatePost = (req, res) => {
    const id = req.params.postId;
    const { title, content } = req.body; // Removed 'image' from the destructured object
    db.query('UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *', [title, content, id], (error, results) => {
        if (error) {
            console.error('Database error:', error); // Log the error for more details
            return res.status(500).send('Error in the database: ' + error.message);
        }
        if (results.rows.length > 0) {
            res.status(200).json(results.rows[0]);
        } else {
            res.status(404).send('Post not found');
        }
    });
};


// Borrar un post
exports.deletePost = (req, res) => {
    const id = req.params.postId;
    db.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id], (error, results) => {
        if (error) {
            return res.status(500).send('Error in the database');
        }
        if (results.rows.length > 0) {
            res.status(204).send();
        } else {
            res.status(404).send('Post not found');
        }
    });
};