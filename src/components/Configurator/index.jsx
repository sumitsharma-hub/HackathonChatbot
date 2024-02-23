import React, { useEffect, useState } from "react";
import { IoIosChatboxes } from "react-icons/io";
import { FaSearchPlus } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { Link, useLocation,useNavigate } from "react-router-dom";
import ThemeToggle from "../ThemeButton";

const Configurator = ({ type, show, handleModel, isOpen }) => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("isDarkMode") === "true");
  const location = useLocation();
  const navigator = useNavigate();
  console.log(location.pathname,'this is navigator--->')

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(localStorage.getItem("isDarkMode") === "true");
    };
    window.addEventListener("themeChange", handleThemeChange);
    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
    };
  }, []);

  return (
    <>
      <div className={` ${isOpen ? "hidden" : "w-72 p-4"} h-svh ${isDarkMode ? "bg-[#adc0da]" : "bg-black"}`}>
        <div className={`${isDarkMode ? "bg-[#adc0da]" : "bg-white"}`}>
          <img src="./images/innovadocTransparent.png" alt="" />
        </div>

        <div className={`flex-1 p-4 flex gap-10 items-center justify-center `}>
          {!type ? null : (
            <div>
              {" "}
              <img src="./images/generativeAI.png" alt="Placeholder" className="mb-4" />{" "}
            </div>
          )}
          <div className={`flex gap-4 ${isDarkMode ? "text-black" : "text-white"}`}>
            <div className="w-full">
              <div className="relative right-0">
                <h1 className="py-1">Choose a model.</h1>
                <ul className="relative flex flex-wrap p-1 list-none rounded bg-blue-50 gap-5" role="list">
                  <Link
                    to="/"
                    // onClick={() => handleModel("model1")}
                    className={`z-30 flex gap-2 items-center w-full p-2 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit hover:bg-gray-400 ${
                      location.pathname === "/" ? "bg-gray-400" : ""
                    }`}
                  >
                    <IoIosChatboxes />
                    <span className="ml-1">Diagnosis</span>
                  </Link>
                  <Link
                    to="/drug"
                    // onClick={() => handleModel("model2")}
                    className={`z-30 flex items-center gap-2 w-full p-2 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit hover:bg-gray-400 ${
                      location.pathname === "/drug" ? "bg-gray-400" : ""
                    }`}
                  >
                    <FaSearchPlus />
                    <span className="ml-1">Drug and Medical Info</span>
                  </Link>
                  <Link
                    to="/image-upload"
                    // onClick={() => handleModel("model3")}
                    className={`z-30 flex items-center gap-2 w-full p-2 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit hover:bg-gray-400 ${
                      location.pathname === "/image-upload" ? "bg-gray-400" : ""
                    }`}
                  >
                    <FaImage />
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
