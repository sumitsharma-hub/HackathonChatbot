// src/pages/ChatPage.js
import React, { useEffect, useState } from "react";
import { Analyze, ChatInput, ChatMessages, Configurator } from "../../components";
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

const ChatPage = () => {
  const [currentModel, setCurrentModel] = useState("model1");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [botLogs, setBotLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const storedSessionId = localStorage.getItem("session_id");
  const [session_id, setSessionId] = useState(storedSessionId || generateNewSessionId());

 useEffect(() => {
    // Save the session_id to localStorage whenever it changes
    localStorage.setItem('session_id', session_id);

    // Add an event listener to refresh the session_id when the user closes the tab or refreshes the page
    const handleUnload = () => {
      const newSessionId = generateNewSessionId();
      localStorage.setItem('session_id', newSessionId);
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
  const toggleModel = () => {
    setCurrentModel(currentModel === "model1" ? "model2" : "model1");
  };
  const handleLeftPanel = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (text) => {
    // Handle sending a user message logic here
    const userMessage = { id: Date.now(), text, isBot: false };
    setMessages([...messages, userMessage]);

    // Make a POST API call to get a bot response
    const payload = {
      session_id: session_id,
      body: text,
      symptoms_list: [],
      diseases_list: [],
      chat_history: [],
    };
    setIsLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_PUBLIC_API_URL, {
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

      setMessages([...messages, userMessage, botResponse]);
    } catch (error) {
      console.error("Error fetching bot response:", error.message);
      const errorMessage = { id: Date.now() + 2, text: error.message, isBot: true, isError: true };
      setMessages([...messages, errorMessage]);
      setIsLoading(false);
      // Handle error as needed
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (quickReplyText) => {
    // Handle sending a quick reply logic here
    handleSendMessage(quickReplyText);
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "#343541" }}>
      {/* {isOpen ? ( */}
      <div className={` ${isOpen ? "hidden" : "w-72 bg-black p-4"}`}>
        <div className="bg-white p-4">
          <img src="./images/innova.png" alt="" />
        </div>
        <Configurator type={false} handleLeftPanel={handleLeftPanel} show={isOpen} />
      </div>
      {/* ) : null} */}
      <button
        className={` ${
          isOpen ? "left-4" : "left-72"
        } ml-2 close-left-panel-button absolute  top-72 w-2 h-8 rounded-t-lg rounded-b-lg bg-black z-10 `}
        onClick={handleLeftPanel}
        {...(isOpen ? <FaChevronRight /> : <FaChevronLeft />)}
      ></button>
      <div className="flex-1 flex flex-col overflow-y-auto hide-scroll">
        <ChatMessages messages={messages} onQuickReply={handleQuickReply} isLoading={isLoading} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
      <div className="w-1/4 bg-black p-4 overflow-y-auto hide-scroll">
        {/* <Configurator type={false} /> */}
        <Analyze logs={botLogs} />
      </div>
    </div>
  );
};

export default ChatPage;
