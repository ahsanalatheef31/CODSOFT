import React, { useState } from "react";
import axios from "axios";
import '../CssFiles/CreatePost.css';
import Navbar from "../components/Navbar";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:8000/api/posts/', formData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccessMessage("Post successfully created!");
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error.message);
      setSuccessMessage("Post cannot be created!");
    }
  };

  return (
    <div className="create">
      <Navbar />
      <form onSubmit={handleSubmit} className="create-form" encType="multipart/form-data">
        <h2>Create Blog Post</h2>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write something..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Publish</button>
      </form>
       {successMessage 
        ? <p className="success-message">{successMessage}</p> 
        : null}

    </div>
  );
}

export default CreatePost;
