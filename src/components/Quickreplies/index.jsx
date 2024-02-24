import React, { useEffect, useState } from "react";
import { FaPaintBrush, FaRegDotCircle } from "react-icons/fa";
import { FaScaleBalanced } from "react-icons/fa6";

const QuickReplies = ({ type, handleLeftPanel, show, handleQuickReplyClick }) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("isDarkMode") === "true");

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(localStorage.getItem("isDarkMode") === "true");
    };
    window.addEventListener("themeChange", handleThemeChange);
    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
    };
  }, []);

  const QuickRepliesArray = [
    {
      id: 1,
      label: "Headache",
      description: "I have a headache.",
    },
    {
      id: 2,

      label: "Body Pain",
      description: "I have body pain.",
    },

    {
      id: 3,
      label: "Rash",
      description: "I have rash",
    },
    {
      id: 4,
      label: "High Blood Pressure",
      description: "I have high blood pressure",
    },
  ];

  return (
    <>
      <div className={`flex-1 p-4 flex flex-col items-center justify-center left-panel `}>
        {!type ? null : (
          <div>
            <img src="./images/generativeAI.png" alt="Placeholder" className="mb-4" />
          </div>
        )}
        <div
          className={`grid gap-4 ${
            isDarkMode ? "text-black" : "text-white"
          } last:mb-2 md:mx-4 md:last:mb-6 lg:max-w-2xl xl:max-w-3xl`}
        >
          <div className={`text-center mb-4 mt-40 max-w-fit ${isDarkMode ? "text-black" : "text-white"}`}>
            <h1 className={`text-3xl font-bolder ${isDarkMode ? "text-black" : "text-white"}`}>Welcome to INNODOC!</h1>
            <p className="text-white-600">
              Please share your symptoms or concerns, and ensure to answer all the questions in the DIAGNOSIS section so
              we can provide you with an accurate diagnosis
            </p>
          </div>
          <div className="flex-grow grid grid-cols-2 gap-4 mt-10  ">
            {QuickRepliesArray.map((model) => (
              <div
                key={model.id}
                className={`flex flex-col p-1 rounded bg-blue-50 gap-5 ${
                  activeTab === model.id ? "bg-blue-200" : ""
                } bg-inherit hover:bg-gray-400 border-2 rounded-2xl border-gray-500 hidden md:block `}
              >
                <button
                  onClick={() => handleQuickReplyClick(model.description)}
                  className={`flex flex-col align-middle text-center cursor-pointer rounded p-2`}
                >
                  <span className="ml-1 font-bold">{model.label}</span>
                  {/* <p className="text-sm">{model.title}</p> */}
                  <p className="text-xs mb-0 text-left font-bold opacity-50">{model.description}</p>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickReplies;
