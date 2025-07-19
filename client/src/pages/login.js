import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Don't forget this on form submit

    try {
      const res = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', res.data.token); // Save token
      alert("Login successful!");
      navigate('/app'); // Redirect to weather app
    } catch (err) {
      console.error("❌ Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

   return (
    <div
   style={{
  backgroundImage: "url('/k.jpg')",   // make sure 'k.jpg' is in your public folder
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",               // vertical centering
  paddingLeft:"100px",
  margin: 0,
}}
    >
      <h1
      style={{
        color: "black",
        fontSize: "3rem",
        fontWeight: "bold",
        marginBottom: "20px",
        textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
        alignSelf: "flex-start",
        paddingLeft: "60px",
      }}
    >
      WeatherYoo!
    </h1>
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          backdropFilter:"blur(8px)",
          width: "300px",
  animation:"fadeIn 0.4s ease-in-out",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", fontFamily: "Arial", color: "#333" }}>
          Login
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
          />
          <br />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Login
          </button>
        </form>
        <p style={{ marginTop: "10px" }}>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};



export default Login;