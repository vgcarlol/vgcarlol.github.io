import React from 'react';
import PostForm from './PostForm';

const Dashboard = () => {
  const dummyPosts = [
    { id: 1, title: 'Post 1', content: 'Content 1', date: '2024-01-01' },
    { id: 2, title: 'Post 2', content: 'Content 2', date: '2024-01-02' }
  ];

  return (
    <div>
      <h2>Lista de Publicaciones</h2>
      <button onClick={() => console.log('Abrir modal para crear/editar post')} className='admin-button'>Crear Nueva Publicación</button>
      <div className="post-item">
        {dummyPosts.map((post) => (
          <div key={post.id} className='post-controls'>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>Publicado el: {post.date}</small>
            <button onClick={() => console.log('Editar post')} className='edit'>Editar</button>
            <button onClick={() => console.log('Eliminar post')} className='delete'>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
