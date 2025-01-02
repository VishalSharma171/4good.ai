"use client";

import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage(`Login Successful! Welcome, ${username}`);
  };

  const handleSignup = () => {
    alert("Signup feature not implemented yet!");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Login Page</h1>
        <button onClick={toggleDarkMode} style={styles.toggleButton}>
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
        <button type="button" onClick={handleSignup} style={styles.signupButton}>
          Sign Up
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const baseStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    transition: "background-color 0.3s, color 0.3s",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxWidth: "400px",
    marginBottom: "30px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  toggleButton: {
    padding: "10px 15px",
    fontSize: "14px",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    color: "#fff",
    fontWeight: "bold",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.1)",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "12px 15px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    background: "rgba(255, 255, 255, 0.8)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    color: "#333", // Default color for light mode
    transition: "box-shadow 0.3s, border-color 0.3s",
  },
  button: {
    width: "100%",
    padding: "12px 15px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    background: "linear-gradient(to right, #6a11cb, #2575fc)",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    marginBottom: "15px",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  signupButton: {
    width: "100%",
    padding: "12px 15px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    background: "linear-gradient(to right, #ff5f6d, #ffc371)",
    border: "none",
    borderRadius: "25px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  message: {
    marginTop: "20px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#32cd32",
  },
};

const lightStyles = {
  ...baseStyles,
  container: {
    ...baseStyles.container,
    background: "linear-gradient(to bottom, #f4f4f4, #ffffff)",
    color: "#333",
  },
  form: {
    ...baseStyles.form,
    backgroundColor: "#ffffff",
  },
  input: {
    ...baseStyles.input,
    color: "#333",
  },
};

const darkStyles = {
  ...baseStyles,
  container: {
    ...baseStyles.container,
    background: "linear-gradient(to bottom, #1e1e1e, #2e2e2e)",
    color: "#f4f4f4",
  },
  form: {
    ...baseStyles.form,
    backgroundColor: "#333333",
  },
  input: {
    ...baseStyles.input,
    background: "#444", // Darker background for input
    color: "#f4f4f4", // Light text color
    borderColor: "#555",
  },
};
