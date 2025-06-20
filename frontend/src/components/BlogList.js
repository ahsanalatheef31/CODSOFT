
import React from 'react';
import '../CssFiles/BlogList.css';
import { useNavigate } from 'react-router-dom';

export default function BlogList({ posts }) {
  const navigate = useNavigate();

  if (!posts.length) return <p>No posts available</p>;

  return (
    <div className="blog-list-container">
      {posts.map(post => (
        <div key={post.id} className="blog-card" onClick={() => navigate(`/post/${post.id}`)}>
          {post.image && (
            <img
              src={post.image.startsWith("http") ? post.image : `http://localhost:8000${post.image}`}
              alt="Blog"
              className="post-img"
            />
          )}
          <h3>{post.title}</h3>
          <div className="preview">
            {post.content && post.content.split(' ').slice(0, 12).join(' ')}{post.content && post.content.split(' ').length > 12 ? '...more' : ''}
          </div>
          <div className="author">Author : {post.author}</div>
        </div>
      ))}
    </div>
  );
}
