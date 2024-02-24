import React, { useEffect, useState } from "react";
import "./index.css";
import { FaMoon } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("isDarkMode") === "true");

  const handleToggle = () => {
    setIsDarkMode((prev) => {
      localStorage.setItem("isDarkMode", !prev);
      return !prev;
    });
  };

  useEffect(() => {
    // Notify other components about the theme change
    document.body.classList.toggle("dark", isDarkMode);
    const event = new Event("themeChange");
    window.dispatchEvent(event);
  }, [isDarkMode]);
  return (
    <div className="absolute bottom-10">
      <input type="checkbox" className="checkbox" id="checkbox" checked={isDarkMode} onChange={handleToggle} />
      <label htmlFor="checkbox" className="checkbox-label border-2 border-white">
        {isDarkMode ? <FaMoon style={{ color: "yellow" }} /> : <FaRegSun style={{ color: "orange" }} />}
        {!isDarkMode ? <FaRegSun style={{ color: "orange" }} /> : <FaMoon style={{ color: "yellow" }} />}
        <span className="ball"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
