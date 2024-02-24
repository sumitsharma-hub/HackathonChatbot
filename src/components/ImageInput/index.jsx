import React, { useEffect, useState } from "react";
import { TbPhotoUp } from "react-icons/tb";

const ImageInput = ({ onSelectImage }) => {
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
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-indigo-600");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-indigo-600");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    onSelectImage(file);
    e.currentTarget.classList.remove("border-indigo-600");
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    onSelectImage(file);
  };

  return (
    <div
      className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/4 mx-auto sm:max-w-[400px] relative border-2 border-gray-300 border-dashed rounded-lg p-6"
      id="dropzone"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input type="file" className="absolute inset-0 w-full h-full opacity-0 z-50" onChange={handleInputChange} />
      <div className={`text-center ${isDarkMode ? "text-black" : "text-white"}`}>
        {/* <img className="mx-auto h-12 w-12" src="https://www.svgrepo.com/show/357902/image-upload.svg" alt="" /> */}
        <TbPhotoUp className="mx-auto h-12 w-12" />
        <h3 className="mt-2 text-sm font-medium">
          <label htmlFor="file-upload" className="relative cursor-pointer">
            <span>Drag and drop</span>
            <span className="text-indigo-600"> or browse</span>
            <span> to upload</span>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
          </label>
        </h3>
        <p className={`mt-1 text-xs text-gray-500 ${isDarkMode ? "text-black" : "text-white"}`}>
          PNG, JPG, GIF up to 10MB
        </p>
      </div>
      <img src="" className="mt-4 mx-auto max-h-40 hidden w-full" id="preview" alt="Preview" />
    </div>
  );
};

export default ImageInput;
