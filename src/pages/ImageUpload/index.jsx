import React, { useState, useEffect } from "react";
import { ChatInput, ImageInput, Loader } from "../../components";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [apiResponse, setApiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  const handleImageUpload = async () => {
    setIsLoading(true);

    try {
      // Convert the selected image to base64-encoded string
      const base64String = await convertImageToBase64(selectedImage);

      const payload = {
        image: base64String,
      };

      const response = await fetch(import.meta.env.VITE_PUBLIC_IMAGE_API_URL, {
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
      console.log(jsonData, "this is json data-->");
      // const summarizedQuestion = jsonData.summarized_question;
      setApiResponse(summarizedQuestion);
    } catch (error) {
      setIsLoading(false);
      console.error("Error uploading image and fetching data from API", error);
    } finally {
      setIsLoading(false);
    }
  };

  const convertImageToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1];
          resolve(base64String);
        };
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <div className={`flex h-screen overflow-hidden  flex-col items-center ${isDarkMode ? "bg-white" : "bg-[#343541]"}`}>
      <div className={`w-full ${isDarkMode ? "text-black" : "text-white"} mb-4 text-center`}>
        <h2 className="text-2xl font-bold  custom-box-shadow p-5">Upload an Image for Diagnosis</h2>
      </div>
      <ImageInput onSelectImage={handleImageSelect} />
      {selectedImage && (
        <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="mt-4 max-w-md w-full" />
      )}
      <button onClick={handleImageUpload} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Upload Image
      </button>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          dangerouslySetInnerHTML={{ __html: apiResponse }}
          className={`overflow-y-auto ${isDarkMode ? "text-black" : "text-white"}`}
        />
      )}
    </div>
  );
};

export default ImageUpload;
