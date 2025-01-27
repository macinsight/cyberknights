import React, { useEffect, useState } from "react";
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
    <header className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Cyberknights Companion App</h1>
      <ToggleSwitch
        label="Dark Mode"
        checked={isDarkMode}
        onChange={setIsDarkMode}
      />
    </header>
  );
};

export default Header;
