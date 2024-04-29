import React from 'react';

const Post = ({ title, content, date }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{date}</h6>
        <p className="card-text">{content}</p>
      </div>
    </div>
  );
};

export default Post;
