import React, { useState, useEffect } from 'react';
import Post from '../components/Blog/Post';
import { getPosts } from '../api/BlogService';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
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
            <Post title={post.title} content={post.content} publishDate={new Date(post.publish_date).toLocaleDateString()} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
