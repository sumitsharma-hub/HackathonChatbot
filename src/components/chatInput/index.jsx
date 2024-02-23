// src/components/ChatInput.js
import React, { useEffect, useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";

const ChatInput = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState("");
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


  const handleInputChange = (e) => {
    console.log(e.target.value,'this is chatinput-->')
    setInputText(e.target.value);
  };

  const handleKeyDown = (e) => {
    console.log("this is being called--handlekeydown");
    // Check if the pressed key is Enter
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents a new line in the input
      handleSendMessage();
    }
  };

  const handleSendMessage = (e) => {
    if (inputText.trim() !== "") {
      onSendMessage(inputText);
      setInputText("");
    }
  };

  return (
    <>
      <form
        className="w-full pt-2 md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:w-[calc(100%-4.5rem)] mx-auto"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
          <div className="relative flex h-full flex-1 items-stretch md:flex-col">
            <div className="flex w-full items-center">
              <div className={`overflow-hidden  flex flex-col w-full border-1 ${isDarkMode? " border-black": "border-white" } dark:border-token-border-heavy flex-grow relative border border-token-border-heavy dark:text-white rounded-2xl bg-token-main-surface-primary`}>
                <textarea
                  id="prompt-textarea"
                  tabIndex="0"
                  rows="1"
                  placeholder="Ask something..."
                  className={`m-0 w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-3.5 md:pr-12  pl-3 md:pl-4 ${isDarkMode? "text-black placeholder-black":"text-white placeholder-white/50"}`}
                  style={{ maxHeight: "200px", minHeight: "52px" }}
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                ></textarea>
                <button className="absolute  md:bottom-3 md:right-14 dark:hover:bg-white right-4 disabled:opacity-10 disabled:text-gray-400  text-white p-0.5    bottom-1.5 transition-colors">
                  <span className="font-size text-xl">
                    <FaRegImage />
                  </span>
                </button>
                <button
                  disabled=""
                  className="absolute bg-black md:bottom-3 md:right-3 dark:hover:bg-white right-2 disabled:opacity-10 disabled:text-gray-400 enabled:bg-black text-white p-0.5 border border-black rounded-lg dark:border-white dark:bg-white bottom-1.5 transition-colors"
                  data-testid="send-button"
                  onClick={handleSendMessage} // Change onSubmit to onClick
                >
                  <span className="font-size text-xl" data-state="closed">
                    <FaArrowUp />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ChatInput;
