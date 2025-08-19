import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaCog, FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";  
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import SCB1 from "../assests/Images/SCB1.jpg"; 
import "./MainLayout.css";
import SC_logo1 from "../assests/Images/SC_logo1.png";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Store currency as code only
  const [currency, setCurrency] = useState("INR");

  // User details
  const user = { name: "Ram", email: "Ram@abccompany.com", accessLevel: 2 };

  const overlayAlpha = sidebarOpen ? 0.6 : 0.08;
  const closeSidebar = () => setSidebarOpen(false);
  const navigate = useNavigate();

  // Currency data with labels, rate keyed by code for conversion and symbol
  const currencies = {
    INR: { label: "INR (India)", rate: 1, symbol: "₹" },
    USD: { label: "USD (United States)", rate: 0.0125, symbol: "$" },
    EUR: { label: "EUR (Euro)", rate: 0.011, symbol: "€" },
    GBP: { label: "GBP (United Kingdom)", rate: 0.0097, symbol: "£" },
  };

  // Base balance in INR
  const baseBalanceINR = 125500;

  // Converted balance
  const convertedBalance = (baseBalanceINR * currencies[currency].rate).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Handle currency change on selection
  const handleSelect = (eventKey) => {
    // eventKey has full label like "INR (India)"
    // Extract the currency code from the eventKey by splitting
    const selectedCode = eventKey.split(" ")[0];  
    if (currencies[selectedCode]) {
      setCurrency(selectedCode);
    }
  };

  return (
    <div className="d-flex flex-column vh-100 position-relative">
      <header className="d-flex align-items-center justify-content-between bg-primary bg-opacity-75 px-3 py-2" style={{ zIndex: 1051 }}>
        <div className="d-flex align-items-center">
          <img src={SC_logo1} alt="Bank logo" style={{ height: "40px", marginRight: "10px", borderRadius: "5px", padding:"3px" }} />
        </div>
        <div className="d-flex align-items-center">
          <Dropdown align="end" className="mx-3">
            <Dropdown.Toggle as="span" style={{ cursor: "pointer" }} id="user-dropdown">
              <FaUserCircle size={28} className="text-white mx-3" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.ItemText>
                <div className="fw-bold">{user.name}</div>
                <div style={{ fontSize: "0.9em" }}>{user.email}</div>
                <div style={{ fontSize: "0.85em" }}>Access Level: {user.accessLevel}</div>
              </Dropdown.ItemText>
            </Dropdown.Menu>
          </Dropdown>
          <button className="btn btn- me-2">
            LOGOUT <FaSignOutAlt />
          </button>
          <FaCog size={24} className="text-white" />
        </div>
      </header>

      <div className="d-flex align-items-center w-100 px-4 py-2 bg-primary bg-opacity-50"
        style={{
          borderBottom: "1px solid #e9ecef",
          position: "relative",
          zIndex: 2,
          minHeight: "48px",
          color: "white"
        }}
      >
        <button className="btn btn-primary me-3" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FaBars size={20} className="text-white" />
        </button>
        <button className="btn btn-primary btn-sm me-3" onClick={() => navigate("/home")}>&lt; Back</button>
        <span className="fw-bold">Access Level : {user.accessLevel}</span>
        <span className="ms-auto fw-bold d-flex align-items-center color-white">
          <DropdownButton
            id="currency-dropdown"
            title={currencies[currency].label}
            variant="primary"
            onSelect={handleSelect}
            className="ms-2"
            drop="start"
            container="body"
            popperConfig={{
              modifiers: [
                {
                  name: "flip",
                  enabled: false,
                },
              ],
            }}
          >
            <Dropdown.Item eventKey="INR (India)">INR (India)</Dropdown.Item>
            <Dropdown.Item eventKey="USD (United States)">USD (United States)</Dropdown.Item>
            <Dropdown.Item eventKey="EUR (Euro)">EUR (Euro)</Dropdown.Item>
            <Dropdown.Item eventKey="GBP (United Kingdom)">GBP (United Kingdom)</Dropdown.Item>
          </DropdownButton>
        </span>
      </div>

      {/* BODY */}
      <div className="flex-grow-1 d-flex position-relative"
        style={{
          minHeight: 0,
          backgroundColor: "#fff",
          backgroundSize: "26% auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transition: "background 0.3s",
          marginBottom:"60px"
        }}
      >
        {/* Light overlay */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `rgba(255,255,255,${overlayAlpha})`,
          transition: "background 0.3s",
          zIndex: 1,
          pointerEvents: "none"
        }} />

        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="bg-primary bg-opacity-25 px-3 py-3 d-flex flex-column gap-4"
            style={{
              width: 200,
              minWidth: 120,
              zIndex: 1052,
              position: "relative",
              boxShadow: "2px 0 10px rgba(0,0,0,0.14)"
            }}
          >
            <Link to="/home" className="btn btn-outline-success fw-bold w-200"
              style={{ letterSpacing: "1px", textAlign: "center" , color:"white",backgroundColor:"#0473EA",fontSize:'14px'}}
              onClick={closeSidebar}>Home</Link>
            <Link to="/payrollform" className="btn btn-outline-success fw-bold w-200"
              style={{ letterSpacing: "1px", textAlign: "center" , color:"white",backgroundColor:"#0473EA",fontSize:'14px'}}
              onClick={closeSidebar}>Payroll Form</Link>
            <Link to="/transactions" className="btn btn-outline-success fw-bold w-200"
              style={{ letterSpacing: "1px", textAlign: "center" , color:"white",backgroundColor:"#0473EA",fontSize:'14px'}}
              onClick={closeSidebar}>Transactions</Link>
            <Link to="/paymentapproval" className="btn btn-outline-success fw-bold w-200"
              style={{ letterSpacing: "1px", textAlign: "center" , color:"white",backgroundColor:"#0473EA",fontSize:'14px'}}
              onClick={closeSidebar}>Payment Approval</Link>
            <Link to="/batchtxndetails" className="btn btn-outline-success fw-bold w-200"
              style={{ letterSpacing: "1px", textAlign: "center" , color:"white",backgroundColor:"#0473EA",fontSize:'14px'}}
              onClick={closeSidebar}>Batch Transaction Details</Link>
            <Link to="/accountbalance" className="btn btn-outline-success fw-bold w-200"
              style={{ letterSpacing: "1px", textAlign: "center",color:"white",backgroundColor:"#0473EA",fontSize:'14px'}}
              onClick={closeSidebar}>Account Balance</Link>
          </aside>
        )}

        <main className="flex-grow-1 d-flex flex-column align-items-center pt-4" style={{ zIndex: 2 }}>
          {children}

          {/* Display Account info with converted balance */}
          {/* <div className="p-4 mt-3 border rounded shadow-sm" style={{ maxWidth: 360, width: "100%" }}>
            <div>
              <strong>Account Number:</strong> 1233456789790
            </div>
            <div style={{ marginTop: "10px", fontSize: "1.2rem", fontWeight: "bold", color: "#068242" }}>
              Current Balance: {currencies[currency].symbol} { (125500 * currencies[currency].rate).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }
            </div>
          </div> */}
          
        </main>
      </div>

      {sidebarOpen && (
        <div onClick={closeSidebar}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "600vh",
            backgroundColor: "transparent",
            zIndex: 1049
          }}
        />
      )}

      <footer className="bg-primary py-2 text-white text-center" style={{ position:'fixed',bottom:0,left:0,width:'100%',zIndex: 1035,height:'35px' }}  >
        <div>   
          <a href="#!" className="me-3 text-decoration-none text-white">© 2025 Copyright|</a>
          <a href="#!" className="me-3 text-decoration-none text-white">Privacy Policy |</a>
          <a href="#!" className="me-3 text-decoration-none text-white">Sitemap |</a>
          <a href="#!" className="me-3 text-decoration-none text-white">Support |</a>
        </div>
      </footer>
    </div>
  );
}
// import React, { useState } from "react";
// import { FaUserCircle, FaSignOutAlt, FaCog, FaBars } from "react-icons/fa";
// import { Link, useNavigate, Outlet } from "react-router-dom";  // 👈 add Outlet
// import "bootstrap/dist/css/bootstrap.min.css";
// import Dropdown from "react-bootstrap/Dropdown";
// import DropdownButton from "react-bootstrap/DropdownButton";
// import SC_logo1 from "../assests/Images/SC_logo1.png";
// import "./MainLayout.css";

// export default function MainLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [currency, setCurrency] = useState("INR");
//   const navigate = useNavigate();

//   const user = { name: "Ram", email: "Ram@abccompany.com", accessLevel: 2 };

//   const currencies = {
//     INR: { label: "INR (India)", rate: 1, symbol: "₹" },
//     USD: { label: "USD (United States)", rate: 0.0125, symbol: "$" },
//     EUR: { label: "EUR (Euro)", rate: 0.011, symbol: "€" },
//     GBP: { label: "GBP (United Kingdom)", rate: 0.0097, symbol: "£" },
//   };

//   const handleSelect = (eventKey) => {
//     const selectedCode = eventKey.split(" ")[0];
//     if (currencies[selectedCode]) {
//       setCurrency(selectedCode);
//     }
//   };

//   const overlayAlpha = sidebarOpen ? 0.6 : 0.08;

//   return (
//     <div className="d-flex flex-column vh-100 position-relative">
//       {/* HEADER */}
//       <header className="d-flex align-items-center justify-content-between bg-primary bg-opacity-75 px-3 py-2" style={{ zIndex: 1051 }}>
//         <div className="d-flex align-items-center">
//           <img src={SC_logo1} alt="Bank logo" style={{ height: "40px", marginRight: "10px", borderRadius: "5px", padding:"3px" }} />
//         </div>
//         <div className="d-flex align-items-center">
//           <Dropdown align="end" className="mx-3">
//             <Dropdown.Toggle as="span" style={{ cursor: "pointer" }} id="user-dropdown">
//               <FaUserCircle size={28} className="text-white mx-3" />
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               <Dropdown.ItemText>
//                 <div className="fw-bold">{user.name}</div>
//                 <div style={{ fontSize: "0.9em" }}>{user.email}</div>
//                 <div style={{ fontSize: "0.85em" }}>Access Level: {user.accessLevel}</div>
//               </Dropdown.ItemText>
//             </Dropdown.Menu>
//           </Dropdown>
//           <button className="btn btn- me-2">
//             LOGOUT <FaSignOutAlt />
//           </button>
//           <FaCog size={24} className="text-white" />
//         </div>
//       </header>

//       {/* NAV BAR */}
//       <div className="d-flex align-items-center w-100 px-4 py-2 bg-primary bg-opacity-50"
//         style={{ borderBottom: "1px solid #e9ecef", position: "relative", zIndex: 2, minHeight: "48px", color: "white" }}>
//         <button className="btn btn-primary me-3" onClick={() => setSidebarOpen(!sidebarOpen)}>
//           <FaBars size={20} className="text-white" />
//         </button>
//         <button className="btn btn-primary btn-sm me-3" onClick={() => navigate("/home")}>&lt; Back</button>
//         <span className="fw-bold">Access Level : {user.accessLevel}</span>
//         <span className="ms-auto fw-bold d-flex align-items-center color-white">
//           <DropdownButton id="currency-dropdown" title={currencies[currency].label} variant="primary" onSelect={handleSelect} className="ms-2" drop="start">
//             <Dropdown.Item eventKey="INR (India)">INR (India)</Dropdown.Item>
//             <Dropdown.Item eventKey="USD (United States)">USD (United States)</Dropdown.Item>
//             <Dropdown.Item eventKey="EUR (Euro)">EUR (Euro)</Dropdown.Item>
//             <Dropdown.Item eventKey="GBP (United Kingdom)">GBP (United Kingdom)</Dropdown.Item>
//           </DropdownButton>
//         </span>
//       </div>

//       {/* BODY */}
//       <div className="flex-grow-1 d-flex position-relative" style={{ minHeight: 0, backgroundColor: "#fff", marginBottom:"60px" }}>
//         <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
//           background: `rgba(255,255,255,${overlayAlpha})`, zIndex: 1, pointerEvents: "none" }} />

//         {/* Sidebar */}
//         {sidebarOpen && (
//           <aside className="bg-primary bg-opacity-25 px-3 py-3 d-flex flex-column gap-4"
//             style={{ width: 200, minWidth: 120, zIndex: 1052, position: "relative", boxShadow: "2px 0 10px rgba(0,0,0,0.14)" }}>
//             <Link to="/home" onClick={() => setSidebarOpen(false)} className="btn btn-outline-success fw-bold w-200" style={{ color:"white", backgroundColor:"#0473EA" }}>Home</Link>
//             <Link to="/payrollform" onClick={() => setSidebarOpen(false)} className="btn btn-outline-success fw-bold w-200" style={{ color:"white", backgroundColor:"#0473EA" }}>Payroll Form</Link>
//             <Link to="/transactions" onClick={() => setSidebarOpen(false)} className="btn btn-outline-success fw-bold w-200" style={{ color:"white", backgroundColor:"#0473EA" }}>Transactions</Link>
//             <Link to="/paymentapproval" onClick={() => setSidebarOpen(false)} className="btn btn-outline-success fw-bold w-200" style={{ color:"white", backgroundColor:"#0473EA" }}>Payment Approval</Link>
//             <Link to="/batchtxndetails" onClick={() => setSidebarOpen(false)} className="btn btn-outline-success fw-bold w-200" style={{ color:"white", backgroundColor:"#0473EA" }}>Batch Transaction Details</Link>
//             <Link to="/accountbalance" onClick={() => setSidebarOpen(false)} className="btn btn-outline-success fw-bold w-200" style={{ color:"white", backgroundColor:"#0473EA" }}>Account Balance</Link>
//           </aside>
//         )}

//         <main className="flex-grow-1 d-flex flex-column align-items-center pt-4" style={{ zIndex: 2 }}>
//           {/* 👇 instead of {children}, use this */}
//           <Outlet />

//           <div className="p-4 mt-3 border rounded shadow-sm" style={{ maxWidth: 360, width: "100%" }}>
//             <div><strong>Account Number:</strong> 1233456789790</div>
//             <div style={{ marginTop: "10px", fontSize: "1.2rem", fontWeight: "bold", color: "#068242" }}>
//               Current Balance: {currencies[currency].symbol} {(125500 * currencies[currency].rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//             </div>
//           </div>
//         </main>
//       </div>

//       <footer className="bg-primary py-2 text-white text-center" style={{ position:'fixed',bottom:0,left:0,width:'100%',zIndex: 1035,height:'35px' }} >
//         <div>   
//           <a href="#!" className="me-3 text-decoration-none text-white">© 2025 Copyright |</a>
//           <a href="#!" className="me-3 text-decoration-none text-white">Privacy Policy |</a>
//           <a href="#!" className="me-3 text-decoration-none text-white">Sitemap |</a>
//           <a href="#!" className="me-3 text-decoration-none text-white">Support |</a>
//         </div>
//       </footer>
//     </div>
//   );
// }
