import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider';
import '../components/ImageSlider.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleClick = () => {
  navigate('/login'); 
  }
  const handleSignup = async (e) => {
  e.preventDefault();
  
    try {
      await axios.post(
        'http://localhost:8000/api/auth/users/',
        {
          username,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      alert('Signup successful!');
      navigate('/home');

    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      alert('Signup failed. Username may already exist or something went wrong.');
    }
  };

  return (
    <div className="login-main-layout">
      <div className="login-slider-section">
        <ImageSlider />
      </div>
      <div className="login-form-section">
        <div className="notefeed-hero">
          <span className="notefeed-main">NoteFeed</span>
          <span className="notefeed-fall left">NoteFeed</span>
          <span className="notefeed-fall right">NoteFeed</span>
        </div>
        <div className="signup-wrapper">
          <div className="signup-container">
            <h2>SIGNUP</h2>
            <form className="form" onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Enter a Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Choose a Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Signup</button>
            </form>
            <button onClick={handleClick} >already have an account?</button>
          </div>
        </div>
      </div>
    </div>
  );
}
