import React, { useState, useEffect } from 'react';
import Post from '../components/Blog/Post';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/posts');
        const data = await response.json();
        console.log(data); // Verifica toda la estructura del objeto recibido
        if (data && Array.isArray(data.rows)) {
          setPosts(data.rows); // Usa 'data.rows' para acceder a los posts
        } else {
          console.error('Data received is not formatted correctly:', data);
          setPosts([]); // Evita errores en caso de formato inesperado
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="container mt-4">Cargando...</div>;
  }

  return (
    <div className="container-fluid mt-4">
      <h1 className="text-center mb-4">Blog</h1>
      <div className="row">
        {posts.map((post) => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={post.id}>
            <Post 
              title={post.title} 
              content={post.content} 
              publishDate={new Date(post.publish_date).toLocaleDateString()}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
