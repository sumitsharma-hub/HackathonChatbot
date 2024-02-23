import React, { useEffect, useState } from "react";
import { ChatInput, Loader } from "../../components";

const Drug = () => {
  const [userInput, setUserInput] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserAskedQuestion, setHasUserAskedQuestion] = useState(false); // New state

  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("isDarkMode") === "true");

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(localStorage.getItem("isDarkMode") === "true");
    };
    window.addEventListener("themeChange", handleThemeChange);
    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
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

  return (
    <div
      className={`flex h-screen overflow-hidden p-5 flex-col  ${
        isDarkMode ? "bg-white" : "bg-[#343541]"
      }`}
    >
      <ChatInput onSendMessage={handleSendMessage} />
      <div className="overflow-y-auto mb-4 items-center md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
        {hasUserAskedQuestion ? (
          <div
            dangerouslySetInnerHTML={{ __html: apiResponse }}
            className={`overflow-y-auto ${isDarkMode ? "text-black" : "text-white"} items-center justify-center mx-auto`}
          />
        ) : (
          <p className={`text-lg text-center ${isDarkMode ? "text-black" : "text-white"} lg:max-w-2xl xl:max-w-screen-xl`}>
            Hello! InnoDocs here. Looking for information on drugs or medicines? Just type your question, and I'll get you the details.
          </p>
        )}
      </div>
      {isLoading && <Loader />}
    </div>
  );
};7

export default Drug;
