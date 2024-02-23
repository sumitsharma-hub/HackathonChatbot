// src/components/ChatMessages.js
import React, { useEffect, useState } from "react";
import Chat from "../Chat";

import Configurator from "../Configurator";
import QuickReplies from "../Quickreplies";

const ChatMessages = ({ messages, isLoading, isLastBot, isDarkMode, handleQuickReplyClick }) => {
  const quickReplies = ["Option 1", "Option 2", "Option 3"];

  if (messages.length === 0) {
    return (
      <QuickReplies handleQuickReplyClick={handleQuickReplyClick}/>
    );
    // return <Configurator type={true}/>
  }
  console.log("this is isLoading---->", isLoading);
  const [lastBotIndex, setLastBotIndex] = useState(null);

  useEffect(() => {
    if (isLoading) {
      // Find the index of the last bot message
      const lastIndex = messages.findIndex((message) => message.isBot);
      setLastBotIndex(lastIndex);
    }
  }, [isLoading, messages]);

  return (
    <>
      <div
        className={`header h-14 flex items-center ${
          isDarkMode ? " text-black" : " text-white"
        } w-full  p-2 pl-5  text-bolder text-xl custom-box-shadow`}
      >
        Hackathon Chats
        {/* <img src="" alt="" /> */}
        {/* <img src="./images/innovalight.png" alt="" className="w-full" /> */}
      </div>
      <div className="flex-1 justify-start flex-col overflow-y-auto p-4 stretch flex gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:max-w-2xl xl:max-w-screen-xl hide-scroll">
        {messages.map((message, index) => (
          <Chat
            key={message.id}
            author={message.isBot ? "Bot" : "User"}
            message={message.text}
            type={message}
            profilePhoto={message.isBot ? botProfilePhoto : userProfilePhoto}
            isLoading={isLoading}
            isLastBot={isLastBot}
            isDarkMode={isDarkMode} // Update isLastBot based on the calculated index
          />
        ))}
      </div>
    </>
  );
};

// Assuming you have profile photos for the user and bot
const botProfilePhoto = "./images/bot_image.png";
const userProfilePhoto = "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";

export default ChatMessages;
