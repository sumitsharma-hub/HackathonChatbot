// src/components/Chat.js
import React, { useState } from "react";
import { FaRegClipboard } from "react-icons/fa6";
import Loader from "../Loader";

const Chat = ({ author, message, type, profilePhoto, isLoading }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const picture = profilePhoto;

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  return (
    <div
      className={`flex flex-col p-1 ${
        type.isBot && !isLoading && !isHovered ? "hover:bg-gray-100" : ""
      } ${type.isError ? "bg-red-500 text-white" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex w-full pl-4 dark:border-gray-700 rounded-lg">
          <div className="h-14 w-14 mt-2  rounded-full flex align-middle justify-center bg-inherit">
            {type.isBot ? (
              <div>
                <img className="w-10 rounded-full align-middle flex" src="./images/bot_image.png" alt="" />
              </div>
            ) : (
              <div>
                <img
                  className="w-10 rounded-full align-middle flex"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  alt="user photo"
                />
              </div>
            )}
          </div>
          <div className="w-full p-2 pl-4 dark:text-white text-gray-500 bg-inherit rounded-lg">
            <a href="#" className="bg-inherit text-lg font-bold underline">
              {author}
            </a>
            <p className="bg-inherit whitespace-pre-wrap">{message}</p>
            {type.isBot && !type.isError ? (
              <div className={`flex mt-6 ${!isLoading && !isHovered ? "opacity-0 pointer-events-none" : ""}`}>
                <FaRegClipboard className="cursor-pointer" onClick={handleCopy} />
                {copied && <span className="ml-2 text-green-500">Copied!</span>}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
