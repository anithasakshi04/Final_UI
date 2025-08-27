import React, { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaCog, FaBars } from "react-icons/fa";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import SC_logo1 from "../assests/Images/SC_logo1.png";
import "./MainLayout.css";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const navigate = useNavigate();
  const location = useLocation();

  const user = { name: "Ram", email: "Ram@abccompany.com", accessLevel: 2 };

  const currencies = {
    INR: { label: "INR (India)", rate: 1, symbol: "₹" },
    USD: { label: "USD (United States)", rate: 0.0125, symbol: "$" },
    EUR: { label: "EUR (Euro)", rate: 0.011, symbol: "€" },
    GBP: { label: "GBP (United Kingdom)", rate: 0.0097, symbol: "£" },
  };

  const handleSelect = (eventKey) => {
    const selectedCode = eventKey.split(" ")[0];
    if (currencies[selectedCode]) setCurrency(selectedCode);
  };

  // Common style for header, navbar, sidebar, and footer
  const commonSectionStyle = {
    background: "linear-gradient(135deg,#0473EA,#7BB6F5)",
    color: "white",
  };

  const bodyStyle = {
    background: "transparent",
    color: "white",
  };

  return (
    <div className="d-flex flex-column vh-100 position-relative" style={{ background: "transparent" }}>
      
      {/* Header */}
      <header
        className="d-flex align-items-center justify-content-between px-4 py-3"
        style={{
          ...commonSectionStyle,
          borderBottom: "1px solid rgba(255,255,255,0.15)",
          zIndex: 1051,
        }}>
        <div className="d-flex align-items-center">
          <img src={SC_logo1} alt="Bank logo" style={{ height: "40px", marginRight: "10px" }} />
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
          <button
            className="btn px-3 py-1 me-2"
            style={{
              background: "#0",
              color: "white",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            LOGOUT <FaSignOutAlt />
          </button>
          <FaCog size={24} className="text-white" />
        </div>
      </header>

      {/* Navigation Bar */}
      <div
        className="d-flex align-items-center w-100 px-4 py-2"
        style={{
          ...commonSectionStyle,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          zIndex: 2,

        }}
      >
        <button
          className="btn btn-sm me-3"
          style={{ background: "#7BB6F5", borderRadius: "5px" }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars size={18} className="text-white" />
        </button>
        <button
          className="btn btn-outline-light btn-sm me-3 px-3"
          style={{ borderRadius: "5px" }}
          onClick={() => navigate("/home")}
        >
          &lt; Back
        </button>
        <span className="fw-bold">Access Level : {user.accessLevel}</span>
        <span className="ms-auto fw-bold d-flex align-items-center">
          <DropdownButton
            id="currency-dropdown"
            title={currencies[currency].label}
            onSelect={handleSelect}
            className="ms-2"
            drop="start"
            
          >
            <Dropdown.Item eventKey="INR (India)">INR (India)</Dropdown.Item>
            <Dropdown.Item eventKey="USD (United States)">USD (United States)</Dropdown.Item>
            <Dropdown.Item eventKey="EUR (Euro)">EUR (Euro)</Dropdown.Item>
            <Dropdown.Item eventKey="GBP (United Kingdom)">GBP (United Kingdom)</Dropdown.Item>
          </DropdownButton>
        </span>
      </div>

      {/* Body */}
      <div className="flex-grow-1 d-flex position-relative" style={bodyStyle}>
        {sidebarOpen && (
          <aside
            className="px-3 py-3 d-flex flex-column gap-3"
            style={{
              ...commonSectionStyle,
              width: 220,
              minWidth: 140,
              zIndex: 1052,
            }}
          >
            {[
              { path: "/home", label: "Home" },
              { path: "/payrollform", label: "Payroll Form" },
              { path: "/transactions", label: "Transactions" },
              { path: "/paymentapproval", label: "Payment Approval" },
              { path: "/batchtxndetails", label: "Batch Transaction Details" },
              { path: "/accountbalance", label: "Account Balance" },
            ].map((link, i) => (
              <Link
                key={i}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className="text-white fw-bold text-decoration-none text-center py-2 px-4 rounded-full font-semibold transition duation-300"
                style={{
                  background: "#7BB6F5",
                  borderRadius: "5px",
                }}
                onMouseEnter={(e)=> (e.currentTarget.style.background="#ffffff44")}
                onMouseLeave={(e)=>(e.currentTarget.style.background="#7BB6F5")} >
                {link.label}
              </Link>
            ))}  
          </aside>
        )}

        <main
          className="flex-grow-1 d-flex flex-column align-items-center pt-4 text-white"
          style={{ zIndex: 2 }}
        >
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer
        className="py-2 text-white text-center"
        style={{
          ...commonSectionStyle,
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 1035,
          height: "40px",
          fontSize: "0.85rem",
        }}
      >
        <div>
          <a href="#!" className="me-3 text-decoration-none text-white">© 2025 Copyright</a>
          <a href="#!" className="me-3 text-decoration-none text-white">Privacy Policy</a>
          <a href="#!" className="me-3 text-decoration-none text-white">Sitemap</a>
          <a href="#!" className="me-3 text-decoration-none text-white">Support</a>
        </div>
      </footer>
    </div>
  );
}
