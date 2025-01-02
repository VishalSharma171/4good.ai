"use client";

import { useState } from "react";
import { FaHeart } from "react-icons/fa"; // Make sure to install react-icons

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [activeTab, setActiveTab] = useState("Profile"); // Default tab is Profile

  const handleNextStep = () => {
    if (!username || !email) {
      alert("Please enter both username and email!");
    } else {
      setStep(2);
    }
  };

  const handleLogin = () => {
    if (!password) {
      alert("Please enter your password!");
    } else {
      setIsLoggedIn(true);
    }
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask("");
    } else {
      alert("Please enter a task!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setStep(1);
    setUsername("");
    setEmail("");
    setPassword("");
    setTasks([]);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        {!isLoggedIn ? (
          <div style={styles.loginCard}>
            <div style={styles.symbol}>
              <FaHeart size={40} color="white" />
              <p style={styles.symbolText}>Spread Humanity ❤️</p>
            </div>
            {step === 1 && (
              <div>
                <h2 style={styles.stepTitle}>Enter Username and Email</h2>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={styles.input}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                />
                <button onClick={handleNextStep} style={styles.button}>
                  Next
                </button>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 style={styles.stepTitle}>Enter Password</h2>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                />
                <button onClick={handleLogin} style={styles.button}>
                  Login
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={styles.dashboard}>
            <h1 style={styles.dashboardTitle}>Welcome, {username}</h1>
            <p style={styles.dashboardSubtitle}>Email: {email}</p>
            <button onClick={handleLogout} style={styles.logoutButton}>
              Logout
            </button>
            {activeTab === "Profile" && (
              <div>
                <h3 style={styles.taskTitle}>Your Task List</h3>
                <div style={styles.taskManager}>
                  <input
                    type="text"
                    placeholder="New Task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    style={styles.taskInput}
                  />
                  <button onClick={handleAddTask} style={styles.taskButton}>
                    Add Task
                  </button>
                  <ul style={styles.taskList}>
                    {tasks.map((task, index) => (
                      <li key={index} style={styles.taskItem}>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {activeTab === "Patients" && (
              <div>
                <h3 style={styles.taskTitle}>Patients Section</h3>
                <p style={styles.text}>This section will show patient data.</p>
              </div>
            )}
            {activeTab === "Chatbot" && (
              <div>
                <h3 style={styles.taskTitle}>HumanBot</h3>
                <p style={styles.text}>Chat with HumanBot here!</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={styles.navbar}>
        <div
          style={activeTab === "Chatbot" ? styles.navItemActive : styles.navItem}
          onClick={() => handleTabClick("Chatbot")}
        >
          HumanBot
        </div>
        <div
          style={activeTab === "Patients" ? styles.navItemActive : styles.navItem}
          onClick={() => handleTabClick("Patients")}
        >
          Patients
        </div>
        <div
          style={activeTab === "Profile" ? styles.navItemActive : styles.navItem}
          onClick={() => handleTabClick("Profile")}
        >
          Profile
        </div>
      </div>
    </div>
  );
}

const styles = {
  background: {
    backgroundImage: "url('https://source.unsplash.com/1600x900/?colorful,abstract')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: "15px",
    padding: "40px",
    maxWidth: "450px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    marginBottom: "60px", // Space for the navbar
    animation: "fadeIn 1s ease-in-out",
  },
  loginCard: {
    padding: "30px",
    background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
    borderRadius: "15px",
    color: "white",
  },
  symbol: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  symbolText: {
    fontSize: "20px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  stepTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  input: {
    display: "block",
    margin: "10px auto",
    padding: "12px",
    width: "90%",
    borderRadius: "8px",
    fontSize: "16px",
    border: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
    color: "#333", // Darker text color for better contrast
    outline: "none",
  },
  button: {
    marginTop: "20px",
    backgroundColor: "#4caf50",
    color: "white",
    padding: "12px 25px",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
  },
  dashboard: {
    color: "black",
  },
  dashboardTitle: {
    fontSize: "30px",
    color: "#3f51b5",
    marginBottom: "10px",
  },
  dashboardSubtitle: {
    fontSize: "18px",
    marginBottom: "20px",
    color: "#757575",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  taskTitle: {
    fontSize: "24px",
    color: "#3f51b5",
    marginBottom: "20px",
  },
  taskManager: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  taskInput: {
    display: "block",
    margin: "10px auto",
    padding: "12px",
    width: "90%",
    borderRadius: "8px",
    fontSize: "16px",
    border: "1px solid #ddd",
    backgroundColor: "#f9f9f9",
    color: "#333", // Darker text color for better contrast
    outline: "none",
  },
  taskButton: {
    marginTop: "20px",
    backgroundColor: "#8e44ad",
    color: "white",
    padding: "12px 25px",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
  },
  taskList: {
    listStyleType: "none",
    padding: 0,
    marginTop: "20px",
  },
  taskItem: {
    backgroundColor: "#f1f1f1",
    marginBottom: "10px",
    padding: "12px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    fontSize: "18px",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-around",
    position: "fixed",
    bottom: "0",
    width: "100%",
    backgroundColor: "#4caf50",
    padding: "10px 0",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
  },
  navItem: {
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
  },
  navItemActive: {
    color: "#ffeb3b",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
