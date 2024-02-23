import React, { useState } from "react";
import { FaPaintBrush, FaRegDotCircle } from "react-icons/fa";
import { FaScaleBalanced } from "react-icons/fa6";

const QuickReplies = ({ type, handleLeftPanel, show, isDarkMode, handleQuickReplyClick }) => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const QuickRepliesArray = [
    {
      id: 1,
      icon: <FaPaintBrush />,
      label: "Diagnosis",
      question: "I have a headache",
      description: "Description for Diagnosis",
    },
    {
      id: 2,
      icon: <FaScaleBalanced />,
      label: "Drug and Medical Info",
      question: "what is the use of dolo 650 medicine",
      description: "Description for Drug and Medical Info",
    },
    {
      id: 3,
      icon: <FaRegDotCircle />,
      label: "Skin Image Analysis",
      description: "Description for Skin Image Analysis",
    },
  ];

  return (
    <>
      <div className={`flex-1 p-4 flex gap-10 items-center justify-center left-panel `}>
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
              {QuickRepliesArray.map((model) => {
                return (
                  <div className="relative flex flex-wrap p-1 list-none rounded bg-blue-50 gap-5">
                    <button
                      key={model.id}
                      onClick={() => handleQuickReplyClick(model.description)}
                      className={`z-30 flex align-middle flex-auto text-center cursor-pointer rounded p-2 ${
                        activeTab === model.id ? "bg-blue-200" : ""
                      }`}
                    >
                      <span className="ml-1">
                        <a
                          className="z-30 flex items-center justify-center align-middle w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
                          role="tab"
                          aria-selected={activeTab === model.id ? "true" : "false"}
                        >
                          {/* {model.icon} */}
                          <span className="ml-1">{model.label}</span>
                        </a>
                        <p className="text-sm">{model.title}</p>
                        <p className="text-xs">{model.description}</p>
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickReplies;
