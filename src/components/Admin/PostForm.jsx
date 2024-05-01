import React, { useState, useEffect } from 'react';
import ImageUploadForm from './ImageUploadForm'; // Importa el componente de carga de imágenes

const PostForm = ({ onSave, initialPost = null }) => {
    const [post, setPost] = useState({ title: '', content: '', imageUrl: '' }); // Agrega el estado para la URL de la imagen
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (initialPost) {
            setPost(initialPost);
        }
    }, [initialPost]);

    const handlePostChange = (e) => {
        const { name, value } = e.target;
        setPost(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (imageUrl) => {
        setPost(prev => ({ ...prev, imageUrl })); // Actualiza el estado con la URL de la imagen cargada
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(post).then(() => {
            setPost({ title: '', content: '', imageUrl: '' }); // Reset form after save
            setStatus('Post guardado con éxito.');
            setTimeout(() => setStatus(''), 3000);
        }).catch(() => {
            setStatus('Error al guardar el post.');
            setTimeout(() => setStatus(''), 3000);
        });
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form">
            <label htmlFor="title">Título</label>
            <input
                type="text"
                id="title"
                name="title"
                value={post.title}
                onChange={handlePostChange}
                required
                className="input-field"
            />

            <label htmlFor="content">Contenido</label>
            <textarea
                id="content"
                name="content"
                value={post.content}
                onChange={handlePostChange}
                required
                className="textarea-field"
            />

            <ImageUploadForm onUpload={handleImageUpload} />

            <button type="submit" className="admin-button">Guardar</button>
            {status && <p className="status-message">{status}</p>}
        </form>
    );
};

export default PostForm;
