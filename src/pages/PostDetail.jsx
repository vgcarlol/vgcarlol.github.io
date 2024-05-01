import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import '../assets/PostDetail.css';
import imgDef from '../assets/img-def.png';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="post-detail-container">Cargando...</div>;
  }

  if (!post) {
    return <div className="post-detail-container">No se encontró el post.</div>;
  }

  return (
    <div className="post-detail-container">
      <img src={imgDef} alt="Imagen por defecto" />
    <h2 className="post-detail-title">{post.title}</h2>
      <p className="post-detail-content">{post.content}</p>
      <small className="post-detail-publish-date">Publicado el: {post.publish_date ? format(parseISO(post.publish_date), 'PPP') : 'No date available'}</small>
    </div>
  );
};

export default PostDetail;
