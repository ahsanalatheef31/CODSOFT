import React, { useState, useEffect } from "react";
import axios from "axios";
import '../CssFiles/SearchBar.css';
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showSearch, setShowSearch] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/api/posts/")
      .then(response => setAllPosts(response.data))
      .catch(error => console.error("Error fetching posts:", error));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = term.trim()
      ? allPosts.filter(post => post.title.toLowerCase().startsWith(term.toLowerCase()))
      : [];

    setFilteredPosts(filtered);
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilteredPosts([]);
  };

  const getRandomPosts = (count) => {
    const shuffled = [...allPosts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const postsToShow = searchTerm.trim() ? filteredPosts : getRandomPosts(3);

  return (
    <div className={`search-bar-wrapper ${showSearch ? "active" : ""}`}>
  
      <button className="search-toggle" onClick={() => setShowSearch(prev => !prev)}>
        Search
      </button>

      <div className={`search-toggle ${showSearch ? "active" : ""}`}>
      {(showSearch || window.innerWidth > 768) && (
        <>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm && (
              <button className="clear-button" onClick={handleClear}>✖</button>
            )}
          </div>

          <div className="search-results">
            <h3>Explore more popular post here!</h3>
            {postsToShow.map(post => (
              <div className="search-card" key={post.id} onClick={() => navigate(`/post/${post.id}`)} style={{ cursor: 'pointer' }}>
                {post.image && (
                  <img
                    src={post.image.startsWith("http") ? post.image : `http://localhost:8000${post.image}`}
                    alt="Post"
                    className="search-img"
                  />
                )}
                <h4>{post.title}</h4>
              </div>
            ))}
          </div>
        </>
      )}
      </div>
    </div>
  );
}
