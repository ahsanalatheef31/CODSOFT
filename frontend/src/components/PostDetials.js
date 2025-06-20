import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../CssFiles/PostDetials.css';
import CommentSection from "./CommentSection";
import Navbar from '../components/Navbar';

function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/posts/${id}/`);
        setPost(response.data);
        setLikesCount(response.data.total_likes || 0);
        const username = localStorage.getItem("username");
        setIsAuthor(username && response.data.author === username);
      } catch (error) {
        console.error("Error loading post:", error);
      }
    };
    fetchPost();
  }, [id]);

  const handleLike = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Please log in to like posts.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8000/api/like/${id}/`,
        {},
        { headers: { Authorization: `Token ${token}` } }
      );
      setLiked(response.data.liked);
      setLikesCount(response.data.total_likes);
    } catch (error) {
      console.error("Error liking post:", error);
      alert("Error: Make sure you are logged in.");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to delete a post.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/posts/${id}/`, {
        headers: { Authorization: `Token ${token}` }
      });
      alert("Post deleted.");
      navigate("/home");
    } catch (error) {
      alert("Failed to delete post. You may not be the author.");
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-detail-container">
    <div className="post-detail">
      <Navbar />
      <button className="back-arrow" onClick={() => navigate(-1)} aria-label="Go back" style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.8rem', marginBottom: '10px'}}>
        &#8592;
      </button>
      {post.image && (
        <img
          src={post.image.startsWith("http") ? post.image : `http://localhost:8000${post.image}`}
          alt="Post"
          className="detail-image"
        />
      )}
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p><strong>Author:</strong> {post.author}</p>
      <button onClick={handleLike} className={`like-button${liked ? ' liked' : ''}`} title="Like this post">
        <span style={{fontSize: '1.3em', marginRight: 8}}>{liked ? '❤️' : '🤍'}</span>
        {likesCount}
      </button>
      {isAuthor && (
        <button onClick={handleDelete} className="delete-button" title="Delete this post">
          <span style={{fontSize: '1.2em', marginRight: 6}}>🗑️</span>Delete Post
        </button>
      )}
      <CommentSection postId={id} />
    </div>
    </div>
  );
}

export default PostDetail;
