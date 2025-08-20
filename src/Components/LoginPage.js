import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "./LoginPage.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const navigate = useNavigate(); // Initialize navigate function

  const backgrounds = [
    "/images/bg_1.jpeg",
    "/images/bg2.jpeg",
    "/images/bg3.jpeg",
    "/images/bg_4.jpeg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [backgrounds.length]);

  // Handle form login submit
  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: You can add authentication logic here
    navigate("/home"); // Navigate to home page on login
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${backgrounds[backgroundIndex]})` }}
    >
      {/* Header */}
      <header className="header">
        <div className="logo">Standard Chartered</div>
        <nav>
          <a href="#">Help</a>
          <a href="#">Contact Us</a>
          <a href="#">Support</a>
          <a href="#">About</a>
        </nav>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Left Section */}
        <div className="welcome-section">
          <h1>Welcome to Standard Chartered</h1>
          <p>
            We are committed to delivering exceptional banking services with
            integrity, innovation, and inclusivity.
          </p>

          <div className="mottos">
            <div className="motto-card">✅ Do the right thing</div>
            <div className="motto-card">🚀 Never settle</div>
            <div className="motto-card">🤝 Better together</div>
          </div>
        </div>

        {/* Right Section (Login Box) */}
        <div className="login-box">
          <h2>User Login</h2>

          <form onSubmit={handleLogin}>
            <div className="radio-options">
              <label>
                <input type="radio" name="loginType" defaultChecked /> Operator Login
              </label>
              <label>
                <input type="radio" name="loginType" /> Approver Login
              </label>
              <label>
                <input type="radio" name="loginType" /> User Login
              </label>
            </div>

            <input type="text" placeholder="Username" required />

            <div className="password-container">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                required
              />
              <span
                className="toggle-password"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
