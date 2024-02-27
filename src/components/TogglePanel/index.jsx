import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

const TogglePanel = () => {
  const [isOpen, setIsOpen] = useState(localStorage.getItem("isOpen") === "true");
  const [isHidden, setIsHidden] = useState(localStorage.getItem("isHidden") === "true");

  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("isDarkMode") === "true");

  useEffect(() => {
    console.log("this is inner width-->", window.innerWidth);
  }, [window.innerWidth]);

  const handleResize = () => {
    setIsHidden(window.innerWidth <= 1080 === "true");
    console.log("this is hidden model called--->", isHidden, isOpen);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isHidden) {
      setIsOpen((prev) => !prev);
    }
  }, [isHidden]);
  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(localStorage.getItem("isDarkMode") === "true");
    };
    const handleTogglePanel = () => {
      setIsOpen(localStorage.getItem("isOpen") == "true");
    };

    window.addEventListener("themeChange", handleThemeChange);
    window.addEventListener("togglePanel", handleTogglePanel);
    window.addEventListener("resize", handleResize);
    // handleResize();

    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
      window.removeEventListener("togglePanel", handleTogglePanel);
      window.removeEventListener("resize", handleResize);
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
      className={`${
        isHidden ? "left-0" : ""
      } ml-2 close-left-panel-button absolute top-72 z-10 `}
      onClick={handleLeftPanel}
    >
      {isOpen ? <FaChevronRight className="font-size" /> : <FaChevronLeft className="font-size" />}
    </button>
  );
};

export default TogglePanel;
