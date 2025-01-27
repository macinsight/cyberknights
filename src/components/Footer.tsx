import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: "#222",
        color: "#aaa",
        padding: "20px",
        textAlign: "center",
        marginTop: "40px",
        borderRadius: "20px 20px 0 0",
        boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.2)",
      }}
    >
      <p style={{ margin: 0, fontSize: "1rem", opacity: 0.8 }}>
        &copy; {new Date().getFullYear()} macinsight (Website) / Ahab (Data compilation) / Trese Brothers (Game). All Rights
        Reserved.
      </p>
    </footer>
  );
};

export default Footer;
