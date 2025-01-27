import React, { useEffect, useState } from "react";
import Link from "next/link";
import ToggleSwitch from "@/components/ToggleSwitch";

const Header: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Sync dark mode state with the <html> element
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold tracking-tight hover:text-gray-400 transition">
            Cyberknights
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center gap-6">
          <Link
            href="/"
            className="text-lg hover:text-gray-400 transition duration-200"
          >
            Home
          </Link>
          <Link
            href="/armor"
            className="text-lg hover:text-gray-400 transition duration-200"
          >
            Armor
          </Link>
          <Link
            href="/weapons"
            className="text-lg hover:text-gray-400 transition duration-200"
          >
            Weapons
          </Link>
          {/* Add more links as needed */}
        </nav>

        {/* Dark Mode Toggle */}
        <div className="flex items-center gap-4">
          <ToggleSwitch
            label="Dark Mode"
            checked={isDarkMode}
            onChange={setIsDarkMode}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
