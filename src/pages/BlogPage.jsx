import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import Post from '../components/Blog/Post';
import '../assets/BlogPage.css';
import imgDef from '../assets/img-def.png'

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/posts');
        const data = await response.json();
        if (data && Array.isArray(data.rows)) {
          setPosts(data.rows);
        } else {
          console.error('Data received is not formatted correctly:', data);
          setPosts([]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const truncateContent = (content) => {
    const wordLimit = 500;
    return content.split(" ").slice(0, wordLimit).join(" ") + (content.split(" ").length > wordLimit ? "..." : "");
  };

  if (loading) {
    return <div className="container mt-4">Cargando...</div>;
  }

  return (
    <div className="container-fluid mt-4">
      <h1 className="text-center mb-4">Blog</h1>
      <div className="row">
        {posts.map((post) => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={post.id}>
          <Link to={`/posts/${post.id}`} className="link">
            <Post 
              img={imgDef}
              title={post.title} 
              content={truncateContent(post.content)} 
              publishDate={new Date(post.publish_date).toLocaleDateString()}
            />
          </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
