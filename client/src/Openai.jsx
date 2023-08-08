import React, { useState } from "react";
import axios from "axios";
import { ReactComponent as PlusIcon } from "./assets/plus-solid.svg";
function OpenAI({ formData }) {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const generateBioPrompt = async () => {
    const { name, subtitle, education, experience, skills } = formData;

    const promptTemplate = `
###
Name: Sara Johnson
Subtitle: Data Scientist.
Education: Master of Science in Data Science.
Experience: Data Scientist at XYZ Analytics.
Skills: collaborative, forward-thinking environment.

Bio: Hello! I'm Sarah Johnson, a passionate Data Scientist with expertise in machine learning and a drive for creating data-driven solutions.
I hold a Master of Science in Data Science and have hands-on experience as a Data Scientist at XYZ Analytics, where I've contributed to developing cutting-edge data models and extracting valuable insights from complex datasets.
 I'm now seeking opportunities to leverage my skills and knowledge in a collaborative and forward-thinking environment where I can contribute to meaningful projects and drive innovation through data. Let's unlock the power of data together and drive data-enabled success!
###

Name: ${name}
Subtitle: ${subtitle}
Education: ${education}
Experience: ${experience}
Skills: ${skills}
Bio: 

    
    `;

    setPrompt(promptTemplate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await generateBioPrompt();

    try {
      // Send a request to the server with the prompt
      const res = await axios.post("http://localhost:8080/chat", { prompt });
      // Update the response state with the server's response
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleTextareaInput = () => {
    const textarea = document.querySelector("textarea[name='bio']");
    textarea.style.height = "auto"; 
    textarea.style.height = textarea.scrollHeight + "px"; 
  };
  console.log("Response", response);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ position: "relative" }}>
          <textarea
            className=""
            type="text"
            rows="1"
            style={{ resize: "none", overflow: "hidden" }}
            onInput={handleTextareaInput}
            name={"bio"}
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Add an AI-generated bio or write your own"
          />
          <button
            type="submit"
            id="bioSubmit"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              cursor: "pointer",
              background: "transparent",
              border: "none",

              outline: "none",
            }}
          >
            <PlusIcon alt="Add Icon" style={{ width: 20, height: 20 }} />
          </button>
        </div>
      </form>
    </div>
  );
}
export default OpenAI;
