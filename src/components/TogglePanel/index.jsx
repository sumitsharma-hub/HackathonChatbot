import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

const TogglePanel = () => {
  const [isOpen, setIsOpen] = useState(localStorage.getItem("isOpen") === "true");


  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("isDarkMode") === "true");

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(localStorage.getItem("isDarkMode") === "true");
    };
    const handleTogglePanel = () => {
      setIsOpen(localStorage.getItem("isOpen") == "true");
    };
    window.addEventListener("themeChange", handleThemeChange);
    window.addEventListener("togglePanel", handleTogglePanel);
    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
      window.removeEventListener("togglePanel", handleTogglePanel);
    };
  }, []);

  const handleLeftPanel = () => {
    setIsOpen((prev) => {
      localStorage.setItem("isOpen", !prev);
      return !prev;
    });
  };
  useEffect(() => {
    // Notify other components about the theme change
    document.body.classList.toggle("dark", isOpen);
    const event = new Event("togglePanel");
    window.dispatchEvent(event);
  }, [isOpen]);

  return (
    <button
      className={` ${isOpen ? "left-0" : "left-72"} ml-2 close-left-panel-button absolute top-72 z-10 `}
      onClick={handleLeftPanel}
    >
      {isOpen ? <FaChevronRight className="font-size" /> : <FaChevronLeft className="font-size" />}
    </button>
  );
};

export default TogglePanel;
