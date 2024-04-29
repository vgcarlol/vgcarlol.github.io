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
    const id = req.params.postId
    db.query('SELECT * FROM posts WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).send('Error in the database')
        }
        if (results.length > 0) {
            res.status(200).json(results[0])
        } else {
            res.status(404).send('Post not found')
        }
    })
}

// Crear un nuevo post
exports.createPost = (req, res) => {
    const { title, content, image } = req.body
    db.query('INSERT INTO posts (title, content, image) VALUES (?, ?, ?)', [title, content, image], (error, results) => {
        if (error) {
            return res.status(500).send('Error in the database')
        }
        res.status(200).json({ id: results.insertId, title, content, image })
    })
}

// Modificar un post existente
exports.updatePost = (req, res) => {
    const id = req.params.postId
    const { title, content, image } = req.body
    db.query('UPDATE posts SET title = ?, content = ?, image = ? WHERE id = ?', [title, content, image, id], (error, results) => {
        if (error) {
            return res.status(500).send('Error in the database')
        }
        if (results.affectedRows > 0) {
            res.status(200).json({ id, title, content, image })
        } else {
            res.status(404).send('Post not found')
        }
    })
}

// Borrar un post
exports.deletePost = (req, res) => {
    const id = req.params.postId
    db.query('DELETE FROM posts WHERE id = ?', [id], (error, results) => {
        if (error) {
            return res.status(500).send('Error in the database')
        }
        if (results.affectedRows > 0) {
            res.status(204).send()
        } else {
            res.status(404).send('Post not found')
        }
    })
}
