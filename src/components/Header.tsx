import React from "react";

const Header: React.FC = () => {
  return (
    <header
      style={{
        textAlign: "center",
        padding: "30px 20px",
        background: "linear-gradient(135deg, #444, #222)",
        color: "#fff",
        borderRadius: "0 0 20px 20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h1 style={{ fontSize: "2.8rem", margin: "0 0 10px", fontWeight: "bold" }}>
        Cyberknights Companion App
      </h1>
      <p style={{ fontSize: "1.2rem", margin: "0", opacity: 0.8 }}>
        Your ultimate tool for Safehouses, Implants, and Gear.
      </p>
    </header>
  );
};

export default Header;
