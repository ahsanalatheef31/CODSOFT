import React, { useEffect, useState } from "react";
import axios from "axios";
import '../CssFiles/CommentSection.css'

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:8000/api/posts/${postId}/comments/`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => console.error("Error fetching comments:", error));
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${postId}/comments/`,
        { content: newComment },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );
      setComments(prev => [...prev, response.data]);
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      {comments.length === 0 && <p>No comments yet.</p>}
      {comments.map(comment => (
        <div key={comment.id} className="comment">
          <p><strong>{comment.user}:</strong> {comment.content}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <textarea
          rows="3"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add your comment..."
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CommentSection;
