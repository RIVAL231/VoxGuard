import React from "react";
const Signup = () => {
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
          <h2 style={styles.heading}>Create an Account</h2>
          <p style={styles.text}>
            Already have an account? <a href="#" style={styles.link}>Login</a>
          </p>
          <input type="text" placeholder="First Name" style={styles.input} />
          <input type="text" placeholder="Last Name" style={styles.input} />
          <input type="email" placeholder="Email" style={styles.input} />
          <input type="password" placeholder="Password" style={styles.input} />
          <button style={styles.loginButton}>Create Account</button>
        </div>
      </div>
    );
  };
  
  const styles = {
    container: {
      display: "flex",
      position:"relative",
      top:"0rem",
      marginTop:'2rem',
      marginBottom:"2rem",
      left:"10rem",
      justifyContent: "center",
      justifyItems:"center",
      height:"90vh",
      alignItems: "center",
      borderRadius:"20px",
    //   height: "100vh",
      backgroundColor: "#f8f9fa",
      boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
      width:"80%",
      padding:"20px"

    },
    imageSection: {
      flex: 1,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:"#E5E5E5",
      borderRadius:"37px",
      margin:"20px"
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
    //   backgroundColor: "white",
      padding: "40px",
      height:"60%",
      width:"50%",
      borderRadius: "10px",
      textAlign: "center",
    //   boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",

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

  };
  
  export default Signup;
  