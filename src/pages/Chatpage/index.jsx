// src/pages/ChatPage.js
import React, { useEffect, useState } from "react";
import { Analyze, ChatInput, ChatMessages, Configurator, ThemeToggle, TogglePanel } from "../../components";

const ChatPage = () => {
  const [currentModel, setCurrentModel] = useState("model1");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(localStorage.getItem("isOpen") === "true");
  const [botLogs, setBotLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastBot, setIsLastBot] = useState(false);
  const storedSessionId = localStorage.getItem("session_id");
  const [session_id, setSessionId] = useState(storedSessionId || generateNewSessionId());

  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("isDarkMode") === "true");

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(localStorage.getItem("isDarkMode") === "true");
    };
    const handleTogglePanel = () => {
      setIsOpen(localStorage.getItem("isOpen") == "true");
    };
    window.addEventListener("themeChange", handleThemeChange);
    window.addEventListener("togglePanel", handleTogglePanel);
    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
      window.removeEventListener("togglePanel", handleTogglePanel);
    };
  }, []);

  const handleModel = (selectedModel) => {
    setCurrentModel(selectedModel);
  };

  useEffect(() => {
    // Save the session_id to localStorage whenever it changes
    localStorage.setItem("session_id", session_id);

    const handleUnload = () => {
      const newSessionId = generateNewSessionId();
      localStorage.setItem("session_id", newSessionId);
    };

    window.onunload = handleUnload;
    // Clean up the event listener when the component is unmounted
    return () => {
      window.onunload = null;
    };
  }, [session_id]);

  // Function to generate a new session_id
  function generateNewSessionId() {
    const newSessionId = Date.now().toString();
    return newSessionId;
  }

  const handleLeftPanel = () => {
    setIsOpen((prev) => {
      localStorage.setItem("isOpen", !prev);
      return !prev;
    });
  };

  const handleQuickReplyClick = (quickReplyText) => {
    // Handle sending a user message logic here for quick replies
    handleSendMessage(quickReplyText);
  };

  const handleSendMessage = async (text) => {
    // Handle sending a user message logic here
    const userMessage = { id: Date.now(), text, isBot: false };
    setMessages([...messages, userMessage]);

    const payload = {
      session_id: session_id,
      body: text,
      symptoms_list: [],
      diseases_list: [],
      chat_history: [],
    };
    setIsLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_PUBLIC_DIAGNOSIS_API_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 500) {
        setIsLoading(false);
        alert("Server Error! Please Try Again Later.");
        throw new Error("Failed to fetch bot response");
      }

      const botResponseData = await response.json();
      setBotLogs(botResponseData);
      const botResponse = { id: Date.now() + 1, text: botResponseData.summarized_question, isBot: true };
      const isLastBot = botResponse.isBot && !isLoading;

      setMessages([...messages, userMessage, botResponse]);
      setIsLastBot(isLastBot);
    } catch (error) {
      console.error("Error fetching bot response:", error.message);
      const errorMessage = { id: Date.now() + 2, text: error.message, isBot: true, isError: true };
      setMessages([...messages, errorMessage]);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (quickReplyText) => {
    handleSendMessage(quickReplyText);
  };

  return (
    <div className={`flex h-screen overflow-hidden ${isDarkMode ? "bg-white" : "bg-[#343541]"}`}>
      <TogglePanel />
      <div className="flex-1 flex flex-col overflow-y-auto hide-scroll">
        <div
          className={`header h-14 flex items-center ${
            isDarkMode ? " text-black" : " text-white"
          } w-full  p-2 pl-0  text-bolder text-xl custom-box-shadow bg-cover overflow-y-auto`}
        >
          <img src="./images/innovanew.png" alt="" className="max-h-12 w-auto" />
        </div>
        <ChatMessages
          messages={messages}
          onQuickReply={handleQuickReply}
          isLoading={isLoading}
          isLastBot={isLastBot}
          expand={isOpen}
          isDarkMode={isDarkMode}
          handleQuickReplyClick={handleQuickReplyClick}
        />
        <ChatInput onSendMessage={handleSendMessage} isDarkMode={isDarkMode} />
      </div>
      <div
        className={`${!isOpen ? "w-96" : "w-2/5"}  ${
          isDarkMode ? "bg-[#adc0da]" : "bg-black"
        }  p-4 overflow-y-autos hide-scroll hidden-sidebar`}
      >
        <Analyze logs={botLogs} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

export default ChatPage;
