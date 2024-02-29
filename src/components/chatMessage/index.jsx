// src/components/ChatMessages.js
import React, { useEffect, useRef, useState } from "react";
import Chat from "../Chat";

import Configurator from "../Configurator";
import QuickReplies from "../Quickreplies";

const ChatMessages = ({ messages, isLoading, isDarkMode, handleQuickReplyClick, botLogs }) => {
  if (messages.length === 0) {
    return (
      <div className="flex-1">
        <QuickReplies handleQuickReplyClick={handleQuickReplyClick} />
      </div>
    );
    // return <Configurator type={true}/>
  }
  const [botResponseLoading, setBotResponseLoading] = useState(false);
  const lastBotIndexRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [isLoading, messages]);
  console.log(botLogs,'this is messages array')

  return (
    <>
      <div
        ref={chatContainerRef}
        className="flex-1 text-left w-full justify-start flex-col overflow-y-auto p-4  stretch flex gap-3 last:mb-2  md:last:mb-6 lg:max-w-2xl lg:mx-auto xl:max-w-screen-xl xl:pl-16 hide-scroll"
      >
        {messages.map((message, index) => (
          <Chat
            key={message.id}
            author={message.isBot ? "Bot" : "User"}
            message={message.text}
            type={message}
            profilePhoto={message.isBot ? botProfilePhoto : userProfilePhoto}
            isLoading={isLoading}
            isDarkMode={isDarkMode}
            end={message.end}
            botLogs={botLogs}
          />
        ))}
        <div ref={messagesEndRef} /> {/* This div serves as the reference point for scrolling */}
      </div>
    </>
  );
};

// Assuming you have profile photos for the user and bot
const botProfilePhoto = "./images/bot_image.png";
const userProfilePhoto = "./images/userImage.png";

export default ChatMessages;
