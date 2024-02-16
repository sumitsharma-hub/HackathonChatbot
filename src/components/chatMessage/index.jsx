// src/components/ChatMessages.js
import React, { useState } from "react";
import Chat from "../Chat";

import Configurator from "../Configurator";
import Loader from "../Loader";

const ChatMessages = ({ messages,isLoading }) => {
  

  if (messages.length === 0) {
    return (
      <Configurator type={true}/>
    );
  }

  return (
    <div className="flex-1 justify-start flex-col overflow-y-auto p-4 stretch flex gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:max-w-2xl xl:max-w-3xl">
      {messages.map((message, index) => (
        <Chat
          key={message.id}
          author={message.isBot ? "Bot" : "User"}
          message={message.text}
          type={message}
          profilePhoto={message.isBot ? botProfilePhoto : userProfilePhoto}
          isLoading={isLoading && index === messages.length - 1} // Show loader only for the last message

        />
      ))}
    </div>
  );
};

// Assuming you have profile photos for the user and bot
const botProfilePhoto = "./images/bot_image.png";
const userProfilePhoto = "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";

export default ChatMessages;
