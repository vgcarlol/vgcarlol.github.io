import React, { useState, useEffect } from 'react';
import Post from '../components/Blog/Post';
// import blogService from '../services/blogService';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // blogService.getPosts().then((data) => {
    //   setPosts(data);
    //   setLoading(false);
    // });

    // Ejemplo de datos estáticos mientras no hay API
    const dummyPosts = [
      { id: 1, title: 'Mi primer post', date: '2024-04-28', content: 'Contenido del primer post...' },
      // Más publicaciones...
    ];

    setPosts(dummyPosts);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="container mt-4">Cargando...</div>;
  }

  return (
    <div className="container-fluid mt-4">
      <h1 className="text-center mb-4">Blog</h1>
      <div className="row justify-content-center">
        {posts.map(post => (
          <div className="col-sm-12 col-md-6 col-lg-4 mb-3 d-flex align-items-stretch" key={post.id}>
            <Post title={post.title} content={post.content} date={post.date} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
