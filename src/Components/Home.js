import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

import CB from "../assests/Images/CB.jpg";
import IC from "../assests/Images/IC.jpg";
import tcn from "../assests/Images/tcn.jpg";
import AB from "../assests/Images/AB.png";
import PA from "../assests/Images/PA.jpg";
import RM from "../assests/Images/RM.jpg"; // <-- New Risk Management Image

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
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Home Page</h1>
      <div className="row g-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="col-md-6"
            initial={{ opacity: 0, y: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{
              scale: 1.05,
              rotate: 1,
              boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
            }}
          >
            <div className="card shadow-lg h-100 overflow-hidden">
              <motion.img
                src={card.image}
                alt={card.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.4 }}
              />
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Home;
