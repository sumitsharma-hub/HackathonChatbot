import React, { useState } from "react";
import { FaPaintBrush } from "react-icons/fa";
import { FaRegDotCircle } from "react-icons/fa";
import { FaScaleBalanced } from "react-icons/fa6";

const Configurator = ({ type,handleLeftPanel,show }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [modelTab, setModelTab] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  const handelModelTab = (tabNumber) => {
    setModelTab(tabNumber);
  };
  return (
    <>
      <div className={`flex-1 p-4 flex gap-10 items-center justify-center left-panel `}>
        {!type ? null : (
          <div>
            {" "}
            <img src="./images/generativeAI.png" alt="Placeholder" className="mb-4" />{" "}
          </div>
        )}
        <div className="flex gap-4">
          <div class="w-full">
            <div class="relative right-0">
              <h1 className="py-1 text-white">Choose a model.</h1>
              <ul class="relative flex flex-wrap p-1 list-none rounded bg-blue-50 gap-5" data-tabs="tabs" role="list">
                {[1, 2].map((modelNumber) => (
                  <li
                    key={modelNumber}
                    onClick={() => handelModelTab(modelNumber)}
                    className={`z-30 flex align-middle flex-auto text-center cursor-pointer rounded p-2 ${
                      modelTab === modelNumber ? "bg-blue-200" : ""
                    }`}
                  >
                    <span className="ml-1 flex">
                      {modelNumber === 1 && (
                        <>
                          <a
                            class="z-30 flex items-center justify-center align-middle w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
                            data-tab-target=""
                            active
                            role="tab"
                            aria-selected="true"
                          >
                            <FaPaintBrush />
                            <span class="ml-1">GPT-3.5 Turbo</span>
                          </a>
                        </>
                      )}
                      {modelNumber === 2 && (
                        <>
                          <a
                            class="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
                            data-tab-target=""
                            active
                            role="tab"
                            aria-selected="true"
                          >
                            <FaScaleBalanced />

                            <span class="ml-1">GPT-4</span>
                          </a>
                        </>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div class="relative right-0">
              <h1 className="py-1 text-white">Choose a conversation style.</h1>
              <ul class="relative flex flex-wrap p-1 list-none rounded bg-blue-50 gap-5" data-tabs="tabs" role="list">
                {[1, 2, 3].map((tabNumber) => (
                  <li
                    key={tabNumber}
                    onClick={() => handleTabClick(tabNumber)}
                    className={`z-30 flex align-middle flex-auto text-center cursor-pointer rounded p-2 ${
                      activeTab === tabNumber ? "bg-blue-200" : ""
                    }`}
                  >
                    <span className="ml-1">
                      {tabNumber === 1 && (
                        <>
                          <a
                            class="z-30 flex items-center justify-center align-middle w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
                            data-tab-target=""
                            active
                            role="tab"
                            aria-selected="true"
                          >
                            <FaPaintBrush />
                            <span class="ml-1">Create</span>
                          </a>
                        </>
                      )}
                      {tabNumber === 2 && (
                        <>
                          <a
                            class="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
                            data-tab-target=""
                            active
                            role="tab"
                            aria-selected="true"
                          >
                            <FaScaleBalanced />

                            <span class="ml-1">Balanced</span>
                          </a>
                        </>
                      )}
                      {tabNumber === 3 && (
                        <>
                          <a
                            class="z-30 flex items-center justify-center w-full px-0 py-1 mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer text-slate-700 bg-inherit"
                            data-tab-target=""
                            active
                            role="tab"
                            aria-selected="true"
                          >
                            <FaRegDotCircle />

                            <span class="ml-1">Precise</span>
                          </a>
                        </>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
       
    </>
  );
};

export default Configurator;
