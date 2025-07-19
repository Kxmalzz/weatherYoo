import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate,Link} from 'react-router-dom'
import './register.css';
 
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
      const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { username:name, email, password };
    try {
      const res = await axios.post("http://localhost:5000/register", user);
      console.log("✅ Registration successful:", res.data);
      alert("Registered Successfully!");
    } catch (err) {
  console.error("❌ Registration failed:", err);

  if (err.response && err.response.data && err.response.data.message) {
    alert(err.response.data.message); // Will show "User already exists"
  } else {
    alert("Registration failed");
  }
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
          backdropFilter:"blur(8px)",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          width: "300px",
          textAlign: "center",
            animation:"fadeIn 0.4s ease-in-out",
        }}
      >
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
          />
          <br />
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
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Register
          </button>
        </form>
        <p style={{ marginTop: "10px" }}>
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </div>
    </div>
  );
};


export default Register;

