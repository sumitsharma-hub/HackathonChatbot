import React from "react";
import "./App.css";
import { ChatPage, Drug, ImageUpload } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Configurator } from "./components";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Configurator />
        <div className="flex-1">
          <Routes>
            <Route path={"/"} element={<ChatPage />} />
            <Route path={"/drug"} element={<Drug />} />
            <Route path={"/image-upload"} element={<ImageUpload />} />
          </Routes>
        </div>
      </div>  
    </BrowserRouter>
  );
}

export default App;
