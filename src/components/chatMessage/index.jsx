// src/components/ChatMessages.js
import React, { useEffect, useState } from "react";
import Chat from "../Chat";

import Configurator from "../Configurator";
import QuickReplies from "../Quickreplies";

const ChatMessages = ({ messages, isLoading, isLastBot, isDarkMode, handleQuickReplyClick }) => {
  if (messages.length === 0) {
    return (
      <div className="flex-1">
        <QuickReplies handleQuickReplyClick={handleQuickReplyClick} />
      </div>
    );
    // return <Configurator type={true}/>
  }
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
      <div className="flex-1 justify-start flex-col overflow-y-auto p-4 md:p-0 stretch flex gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:max-w-2xl xl:max-w-screen-xl hide-scroll">
        {messages.map((message, index) => (
          <Chat
            key={message.id}
            author={message.isBot ? "Bot" : "User"}
            message={message.text}
            type={message}
            profilePhoto={message.isBot ? botProfilePhoto : userProfilePhoto}
            isLoading={isLoading}
            isLastBot={isLastBot}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </>
  );
};

// Assuming you have profile photos for the user and bot
const botProfilePhoto = "./images/bot_image.png";
const userProfilePhoto = "./images/userImage.png";

export default ChatMessages;
