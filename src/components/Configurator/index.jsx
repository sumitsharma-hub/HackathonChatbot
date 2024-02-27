import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { IoIosChatboxes } from "react-icons/io";
import { FaSearchPlus, FaImage } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../ThemeButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Configurator = ({ type }) => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("isDarkMode") === "true");
  const [isOpen, setIsOpen] = useState(localStorage.getItem("isOpen") === "true");
  const [isHidden, setIsHidden] = useState(localStorage.getItem("isHidden") === "true");

  const location = useLocation();
  const sidebarContent = useRef();

  const handleResize = () => {
    setIsHidden(window.innerWidth <= 1080);
  };

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(localStorage.getItem("isDarkMode") === "true");
    };
    const handleTogglePanel = () => {
      setIsOpen(localStorage.getItem("isOpen") === "true");
    };
    window.addEventListener("themeChange", handleThemeChange);
    window.addEventListener("togglePanel", handleTogglePanel);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
      window.removeEventListener("togglePanel", handleTogglePanel);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    // setIsOpen();
    localStorage.setItem("isOpen", false);
    localStorage.setItem("isHidden", false);
  }, []);

  return (
    <>
      <div
        ref={sidebarContent}
        className={` ${isOpen ? "hidden" : "w-72 p-4"} h-svh ${isDarkMode ? "bg-[#adc0da]" : "bg-black"} ${
          isHidden ? "hidden" : ""
        }`}
      >
        <div className={`${isDarkMode ? "bg-[#adc0da]" : "bg-white"}`}>
          {isDarkMode ? (
            <img src="./images/innovanewTransparent.png" alt="" />
          ) : (
            <img src="./images/innovanew.png" alt="" />
            )}
            {/* <img src="./images/innovanew.png" alt="" /> */}
        </div>

        <div className={`flex-1 p-0 mt-4 flex gap-10 items-center justify-center `}>
          {!type ? null : (
            <div>
              {" "}
              <img src="./images/generativeAI.png" alt="Placeholder" className="mb-4" />{" "}
            </div>
          )}
          <div className={`flex gap-4 p ${isDarkMode ? "text-black" : "text-white"}`}>
            <div className="w-full">
              <div className="relative right-0">
                <h1 className="p-1 mb-0 uppercase text-xl">Choose a model</h1>
                <ul className="relative flex flex-wrap p-1 list-none rounded bg-blue-50 gap-1" role="list">
                  <Link
                    to="/"
                    className={`z-30 flex gap-2 items-center w-full p-2 py-4 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700  hover:bg-gray-400 ${
                      location.pathname === "/" ? "bg-gray-400" : ""
                    }`}
                  >
                    <IoIosChatboxes className="text-xl" />
                    <span className="ml-1">Diagnosis</span>
                  </Link>
                  <Link
                    to="/drug"
                    className={`z-30 flex items-center gap-2 w-full p-2 py-4 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700  hover:bg-gray-400 ${
                      location.pathname === "/drug" ? "bg-gray-400" : ""
                    }`}
                  >
                    <FaSearchPlus className="text-xl" />
                    <span className="ml-1">Drug and Medical Info</span>
                  </Link>
                  <Link
                    to="/image-upload"
                    className={`z-30 flex items-center gap-2 w-full p-2 py-4  mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700  hover:bg-gray-400 ${
                      location.pathname === "/image-upload" ? "bg-gray-400" : ""
                    }`}
                  >
                    <FaImage className="text-xl" />
                    <span className="ml-1">Skin Image Analysis</span>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </>
  );
};

export default Configurator;
