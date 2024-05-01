import React from 'react';
import PropTypes from 'prop-types';
import imgDef from '../../assets/img-def.png'

const Post = ({ title, content, publishDate }) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <img className="image-post" src={imgDef} alt="" />
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{publishDate}</h6>
        <p className="card-text">{content}</p>
      </div>
    </div>
  );
};

Post.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  publishDate: PropTypes.string.isRequired
};

export default Post;
