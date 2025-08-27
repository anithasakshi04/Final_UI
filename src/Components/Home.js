import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import CB from "../assests/Images/CB.jpg";
import IC from "../assests/Images/IC.jpg";
import tcn from "../assests/Images/tcn.jpg";
import AB from "../assests/Images/AB.png";
import PA from "../assests/Images/PA.jpg";
import RM from "../assests/Images/RM.jpg";
import oc1 from "../assests/Images/oc1.png";


const cards = [
  {
    title: "Corporate Banking",
    image: CB,
    content:
      "Corporate Banking offers services like payroll management, payment initiation, batch transactions, and account management tailored for enterprises.",
  },
  {
    title: "Investment Banking",
    image: IC,
    content:
      "Investment Banking focuses on capital raising, mergers and acquisitions, and advisory services to support large-scale financial decisions.",
  },
  {
    title: "Transactions",
    image: tcn,
    content:
      "Get detailed insights into all transactions, including approvals, rejections, and completed payments with real-time updates.",
  },
  {
    title: "Account Balance",
    image: AB,
    content:
      "Check real-time account balances across multiple corporate accounts, ensuring full visibility into financial health.",
  },
  {
    title: "Payment Approval",
    image: PA,
    content:
      "Approvers can securely approve, reject, or keep transactions pending, ensuring strict compliance and control.",
  },
  {
    title: "Risk Management",
    image: RM,
    content:
      "Helps organizations manage financial risks, ensure compliance, and safeguard investments from uncertainties.",
  },
];
function Home() {
  const scrollToAbout=()=>{
    const section= document.getElementById("about-section");
    if(section){
      section.scrollIntoView({behavior:"smooth"});
      }
    }
  return (
    <div
      style={{
        backgroundImage: `url(${oc1})` ,
        backgroundPosition:"center",
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        color:"white",
        // height:"100vh",
        // width:"100%"
        
      }}
    >
      {/* Overlay for readability */}
      <div
        style={{
          background: "rgba(0, 0, 0, 0.55)",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        {/* Hero Section */}
        <section
          className="text-center text-white"
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          {/* Hero Content */}
          <div style={{ position: "relative", zIndex: 2, maxWidth: "800px" }}>
            <motion.h1
              className="fw-bold mb-3"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Easy & Digital{" "}
              <span style={{ color: "#38D200" }}>Online Payment</span> Solutions
            </motion.h1>
            <motion.p
              className="lead mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Simplify your corporate banking experience with secure payments,
              approvals, and financial insights — all in one place.
            </motion.p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <motion.button
                className="btn btn-outline-light px-4 py-2"
                style={{ borderRadius: "30px" }}
                whileHover={{ scale: 1.05, backgroundColor: "#ffffff" }}
                onClick={scrollToAbout} >
                ABOUT US  
              </motion.button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          className="container py-5"
          style={{
            background: "#fff", // only cards section white
            borderRadius: "20px",
          }}
        >
          <h2
            className="text-center fw-bold mb-5 p-3 rounded shadow-sm"
            style={{
              background: "linear-gradient(90deg,#7BB6F5,#C3DEFA)",
              color: "#020B43",
            }}
            id="about-section"
          >
            About Us
          </h2>
          <div className="row g-4">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                className="col-md-4"
                initial={{ opacity: 0, y: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 12px 25px rgba(0,0,0,0.25)",
                }}
              >
                <div
                  className="card h-100 border-0 shadow-sm"
                  style={{
                    borderRadius: "20px",
                    background: "#FFFFFF",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  <motion.img
                    src={card.image}
                    alt={card.title}
                    className="card-img-top"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "20px",
                      borderTopRightRadius: "20px",
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="card-body text-start">
                    <h5 className="card-title fw-bold text-dark">
                      {card.title}
                    </h5>
                    <p className="card-text text-secondary">{card.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
