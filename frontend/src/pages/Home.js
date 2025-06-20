import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogList from '../components/BlogList';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';
import './Home.css';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/posts/')
      .then(res => {
        console.log("Fetched posts:", res.data); // ✅ Check if data is fetched
        setPosts(res.data);
        setFilteredPosts(res.data);
      })
      .catch(err => {
        console.error("API error:", err);
      });
  }, []);

  return (
    <div className="home-layout">
      <div className="left-sidebar">
        <Navbar />
      </div>
      <div className="content-area">
        <BlogList posts={filteredPosts} />
      </div>
      <div className="right-sidebar">
        <SearchBar allPosts={posts} onFilter={setFilteredPosts} />
      </div>
    </div>
  );
}
