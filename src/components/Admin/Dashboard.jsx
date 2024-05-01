import React, { useState, useEffect, useCallback } from 'react';
import PostForm from './PostForm';
import { format, parseISO } from 'date-fns';
import axios from 'axios';

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [showForm, setShowForm] = useState(false); // Estado para controlar la visibilidad del formulario

    const fetchPosts = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3000/posts');
            setPosts(response.data.rows || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }, []);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    const savePost = async (post) => {
        const method = post.id ? 'put' : 'post';
        const url = `http://localhost:3000/posts/${post.id || ''}`;
        try {
            const response = await axios[method](url, post);
            setPosts((prev) => post.id ? prev.map(p => p.id === post.id ? response.data : p) : [...prev, response.data]);
            setShowForm(false); // Ocultar el formulario después de guardar
        } catch (error) {
            console.error('Error saving the post:', error.response ? error.response.data : error.message);
        }
    };

    const deletePost = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/posts/${id}`);
            setPosts(prev => prev.filter(post => post.id !== id));
        } catch (error) {
            console.error('Error deleting the post:', error);
        }
    };

    const startEditing = (post) => {
        setEditingPost(post);
        setShowForm(true);
    };

    const startCreating = () => {
        setEditingPost({ title: '', content: '' }); // Resetea cualquier post existente
        setShowForm(true);
    };

    return (
        <div className="admin-container">
            <h2 className="admin-header">Lista de Publicaciones</h2>
            {showForm ? (
                <PostForm initialPost={editingPost} onSave={savePost} />
            ) : (
                <>
                    <button onClick={startCreating} className="admin-button">Crear Post</button>
                    {posts.length > 0 ? posts.map(post => (
                        <div key={post.id} className="post-item">
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                            <small>Publicado el: {post.publish_date ? format(parseISO(post.publish_date), 'PPP') : 'No date available'}</small>
                            <div className="post-controls">
                                <button onClick={() => startEditing(post)} className="edit">Editar</button>
                                <button onClick={() => deletePost(post.id)} className="delete">Eliminar</button>
                            </div>
                        </div>
                    )) : <p>No hay publicaciones disponibles.</p>}
                </>
            )}
        </div>
    );
};

export default Dashboard;
