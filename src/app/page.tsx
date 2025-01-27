"use client";

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const IndexPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background-dark)] text-[var(--foreground-light)] font-[var(--font-family)]">
      {/* Header Section */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-5">
        <h2 className="mb-8 text-2xl font-medium">
          Explore the World of Cyberknights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-[900px]">
          {/* Link Cards */}
          {[
            { label: "Safehouses", href: "/safehouses" },
            { label: "Implants", href: "/implants" },
            { label: "Gear", href: "/gear" },
            { label: "Locations", href: "/locations"},
            { label: "Weapons", href: "/weapons"},
            { label: "Armor", href: "/armor"},
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="card"
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
