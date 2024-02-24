import React, { useEffect, useState } from "react";
import { ChatInput, Loader, TogglePanel } from "../../components";
import HTMLReactParser from "html-react-parser";
import DOMPurify from "dompurify";

const Drug = () => {
  const [userInput, setUserInput] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserAskedQuestion, setHasUserAskedQuestion] = useState(false); // New state

  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("isDarkMode") === "true");
  const [isOpen, setIsOpen] = useState(localStorage.getItem("isOpen") === "true");

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(localStorage.getItem("isDarkMode") === "true");
    };
    const handleTogglePanel = () => {
      setIsOpen(localStorage.getItem("isOpen"));
    };
    window.addEventListener("themeChange", handleThemeChange);
    window.addEventListener("togglePanel", handleTogglePanel);
    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
      window.removeEventListener("togglePanel", handleTogglePanel);
    };
  }, []);

  const handleSendMessage = (text) => {
    setUserInput(text);
    setHasUserAskedQuestion(true); // Set the state when the user asks a question
    handleFormSubmit(text);
  };

  const handleFormSubmit = async (text) => {
    setIsLoading(true);
    try {
      const payload = {
        body: text,
      };

      const response = await fetch(import.meta.env.VITE_PUBLIC_DRUG_API_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setIsLoading(false);
      }

      const jsonData = await response.json();
      const summarizedQuestion = jsonData.summarized_question;

      setApiResponse(summarizedQuestion);
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data from API", error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(apiResponse, "this is apiReposne-->");

  return (
    <>
      <TogglePanel />
      <div className={`flex h-screen overflow-hidden flex-col ${isDarkMode ? "bg-white" : "bg-[#343541]"}`}>
        <div className={`w-full ${isDarkMode ? "text-black" : "text-white"} mb-4 text-center`}>
          <h2 className="text-2xl font-bold inputBoxShadow p-5">Medical Search</h2>
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
        <div className="flex justify-center">{isLoading && <Loader />}</div>
        <div className="overflow-y-auto mb-4 items-center md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto p-5">
          {hasUserAskedQuestion ? (
            <div
              dangerouslySetInnerHTML={{ __html: `${apiResponse}` }}
              className={`overflow-y-auto ${
                isDarkMode ? "text-black" : "text-white"
              } items-center justify-center mx-auto`}
            />
          ) : (
            <p
              className={`text-lg text-center ${
                isDarkMode ? "text-black" : "text-white"
              } lg:max-w-2xl xl:max-w-screen-xl`}
            >
              Hello! InnoDocs here. Looking for information on drugs, symptoms or diseases? Just type your question, and
              I'll get you the details.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Drug;
