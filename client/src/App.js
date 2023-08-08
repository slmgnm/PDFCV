import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Redirect } from "react-router-dom";

import "./App.css";
// import CVpdf from "./CVPdf";
// import CVForm from "./CVForm.jsx";
// import LoginForm from "./LoginForm";
import PDFForm from "./PDFForm";
import OpenAI from "./Openai";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path='/' element={<LoginForm />} /> */}

        <Route
          path="/"
          element={
            <div>
              {/* <CVpdf /> */}
              {/* <CVForm /> */}
              <PDFForm />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
