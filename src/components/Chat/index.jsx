// src/components/Chat.js
import React, { useEffect, useState } from "react";
import { FaRegClipboard } from "react-icons/fa6";
import Loader from "../Loader";
import { TypeAnimation } from "react-type-animation";

const Chat = ({ author, message, type, profilePhoto, isLoading, isLastBot, isDarkMode }) => {
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
    <>
      {isLoading && type.isBot && !isLastBot ? (
        <Loader />
      ) : (
        <div
          className={`flex flex-col p-1 ${type.isError ? "bg-red-500" : ""}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex w-full pl-4 dark:border-gray-700 rounded-lg">
            <div className="h-14 w-14 mt-2  rounded-full flex align-middle justify-center bg-inherit">
              {type.isBot ? (
                <div>
                  <img className="w-10 rounded-full align-middle flex" src="./images/doctorbot.png" alt="" />
                </div>
              ) : (
                <div>
                  <img
                    className="w-10 rounded-full align-middle flex"
                    src="./images/userImage.png"
                    alt="user photo"
                  />
                </div>
              )}
            </div>
            <div className={`w-full p-2 pl-4 ${isDarkMode ? "text-gray-700" : "text-white"}  bg-inherit rounded-lg`}>
              <a href="#" className="bg-inherit text-lg font-bold underline">
                {author}
              </a>
              {type.isBot && !type.isError ? (
                <>
                  <TypeAnimation
                    sequence={[message]}
                    speed={90}
                    cursor={false}
                    style={{ display: "block" }}
                  />
                  <div className={`flex mt-6 ${!isLoading && !isHovered ? "opacity-0 pointer-events-none" : ""}`}>
                    <FaRegClipboard className="cursor-pointer" onClick={handleCopy} />
                    {copied && <span className="ml-2 text-green-500">Copied!</span>}
                  </div>
                </>
              ) : (
                <p className="bg-inherit whitespace-pre-wrap">{message}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
