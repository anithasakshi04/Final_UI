// import React, { useState } from "react";
// import "../App.css"; // reuse your styles
// import { useNavigate } from "react-router-dom";
// import SC_logo1 from "../assests/Images/SC_logo1.png";
// function Login() {
//   const [selectedRole, setSelectedRole] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });

//   const navigate = useNavigate();

//   const handleRoleChange = (role) => {
//     setSelectedRole(role);
//     setShowForm(true);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // ✅ instead of alert, redirect to homepage
//     navigate("/home");
//   };

//   return (
//     <div className="app-container">
//       {/* Header */}
//       <header className="header">
//         <div className="logo">
//           <img
//             src= {SC_logo1}
//             alt="Standard Chartered Logo"
//             className="logo-img"
//           />
//           <span>Standard Chartered</span>
//         </div>
//         <nav className="nav-links">
//           <a href="/help" className="nav-link">Help</a>
//           <a href="/contact" className="nav-link">Contact us</a>
//           <a href="/support" className="nav-link">Support</a>
//           <a href="/about" className="nav-link">About</a>
//         </nav>
//       </header>

//       {/* Main Content */}
//       <main className="main-content">
//         {/* Left Panel */}
//         <div className="left-panel">
//           <h1>Welcome to Standard Chartered</h1>
//           <p>
//             We are committed to delivering exceptional banking services with integrity, innovation, and inclusivity.
//           </p>
//           {/* Core values */}
//           <div className="values-grid">
//             <div className="value-card">
//               <div className="icon">✅</div>
//               <h3>Do the right thing</h3>
//               <p>We value courage and acting with integrity.</p>
//             </div>
//             <div className="value-card">
//               <div className="icon">📈</div>
//               <h3>Never settle</h3>
//               <p>We’re constantly innovating and learning.</p>
//             </div>
//             <div className="value-card">
//               <div className="icon">👥</div>
//               <h3>Better together</h3>
//               <p>We create an inclusive culture where each person is valued.</p>
//             </div>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="right-panel">
//           <div className="login-card">
//             <h2>Login to your account</h2>

//             <div className="login-options">
//               <label>
//                 <input
//                   type="radio"
//                   name="role"
//                   value="operator"
//                   checked={selectedRole === "operator"}
//                   onChange={() => handleRoleChange("operator")}
//                 />
//                 Operator Login
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="role"
//                   value="approver"
//                   checked={selectedRole === "approver"}
//                   onChange={() => handleRoleChange("approver")}
//                 />
//                 Approver Login
//               </label>
//               <label>
//                 <input
//                   type="radio"
//                   name="role"
//                   value="user"
//                   checked={selectedRole === "user"}
//                   onChange={() => handleRoleChange("user")}
//                 />
//                 User Login
//               </label>
//             </div>

//             {showForm && (
//               <form onSubmit={handleSubmit} className="login-form">
//                 <div className="form-group">
//                   <label htmlFor="username">Username</label>
//                   <input
//                     type="text"
//                     id="username"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <label htmlFor="password">Password</label>
//                   <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <button type="submit" className="submit-btn">
//                   Login
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Login;
