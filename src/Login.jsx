import React, { useState } from "react";
import sampleResponse from "../sampleResponse.json";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Verify the login credentials
    if (email === sampleResponse.email && password === sampleResponse.password) {
      // Set cache to indicate the user is logged in
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userData", JSON.stringify(sampleResponse));
      setError("");
      window.location.href = "/dashboard"; // Redirect to another page or perform other actions
      // Redirect to another page or perform other actions
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageSection}>
        <img 
          src="image 9.png" // Replace with actual image URL
          alt="Futuristic helmet"
          style={styles.image}
        />
        <button style={styles.backButton}>← Back to website</button>
      </div>
      <div style={styles.formSection}>
        <h2 style={styles.heading}>Log In</h2>
        <p style={styles.text}>
          Don’t have one? <a href="#" style={styles.link}>Create new account</a>
        </p>
        <input 
          type="email" 
          placeholder="Email" 
          style={styles.input} 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          style={styles.input} 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button style={styles.loginButton} onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    position: "relative",
    top: "0rem",
    marginTop: "2rem",
    marginBottom: "2rem",
    left: "10rem",
    justifyContent: "center",
    justifyItems: "center",
    height: "90vh",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
    width: "80%",
    padding: "20px"
  },
  imageSection: {
    flex: 1,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5E5E5",
    borderRadius: "37px",
    margin: "20px"
  },
  image: {
    width: "90%",
    borderRadius: "10px",
  },
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    backgroundColor: "black",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
  },
  formSection: {
    flex: 1,
    padding: "40px",
    height: "60%",
    width: "50%",
    borderRadius: "10px",
    textAlign: "center",
  },
  heading: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  text: {
    marginBottom: "20px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "16px",
  },
  loginButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "black",
    color: "white",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "10px",
  },
};

export default Login;