"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const IndexPage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#111",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: "30px", fontSize: "2rem", fontWeight: "500" }}>
          Explore the World of Cyberknights
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            width: "100%",
            maxWidth: "900px",
          }}
        >
          {/* Link Cards */}
          {[
            { label: "Safehouses", href: "/safehouses" },
            { label: "Implants", href: "/implants" },
            { label: "Gear", href: "/gear" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                textDecoration: "none",
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#333",
                color: "#fff",
                borderRadius: "15px",
                fontSize: "1rem",
                fontWeight: "500",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s, background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#444")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#333")
              }
            >
              {link.label}
            </a>
          ))}
        </div>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default IndexPage;
