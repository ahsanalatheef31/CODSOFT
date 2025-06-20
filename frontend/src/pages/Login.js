import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import ImageSlider from '../components/ImageSlider';
import '../components/ImageSlider.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/register');
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/token/login/',
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
      const token = response.data.auth_token;
      localStorage.setItem('authToken', token);
      localStorage.setItem('username', username);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Invalid credentials');
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
        <div className="login-wrapper">
          <div className="login-container">
            <h2>LOGIN</h2>
            <form className="form" onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Login</button>
            </form>
            <button onClick={handleClick} >Dont have an account?</button>
          </div>
        </div>
      </div>
    </div>
  );
}


