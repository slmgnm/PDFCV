import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import PDFForm from "./PDFForm";
import OpenAI from "./Openai";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <PDFForm />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
