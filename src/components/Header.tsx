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
            Cyberknights Companion App
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
