import React, { useState } from 'react';
import '../../assets/admin-area.css';

const PostForm = ({ onSave }) => {
  const [post, setPost] = useState({ title: '', content: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(post);
    setPost({ title: '', content: '' }); // Reset form after save
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Título</label>
      <input
        type="text"
        id="title"
        name="title"
        value={post.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="content">Contenido</label>
      <textarea
        id="content"
        name="content"
        value={post.content}
        onChange={handleChange}
        required
      />

      <button type="submit">Guardar</button>
    </form>
  );
};

export default PostForm;
