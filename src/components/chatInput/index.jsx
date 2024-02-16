// src/components/ChatInput.js
import React, { useState } from "react";
import { FaRegImage } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";

const ChatInput = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
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
    console.log("this is handleMessage-->");
    if (inputText.trim() !== "") {
      onSendMessage(inputText);
      setInputText("");
    }
  };

  return (
    <>
      <form
        className="w-full pt-2 md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:w-[calc(100%-.5rem)]"
        onSubmit={(e)=>e.preventDefault()}
      >
        <div className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
          <div className="relative flex h-full flex-1 items-stretch md:flex-col">
            <div className="flex w-full items-center">
              <div className="overflow-hidden [&amp;:has(textarea:focus)]:border-token-border-xheavy [&amp;:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] flex flex-col w-full dark:border-token-border-heavy flex-grow relative border border-token-border-heavy dark:text-white rounded-2xl bg-token-main-surface-primary">
                <textarea
                  id="prompt-textarea"
                  tabIndex="0"
                  data-id="request-NEW:2-7"
                  rows="1"
                  placeholder="Ask something..."
                  className="m-0 w-full resize-none border-0 bg-transparent py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-3.5 md:pr-12 placeholder-black/50 dark:placeholder-white/50 pl-3 md:pl-4"
                  style={{ maxHeight: "200px", height: "52px", overflowY: "hidden" }}
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
