import React, { useState } from "react";
import axios from "axios";
import { ReactComponent as PlusIcon } from "./assets/plus-solid.svg";
import RichTextEditor from "./RichText";
function OpenAI({ formData, onChange }) {
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

    console.log("Sending request to server...");

    try {
      const backendUrl =
        process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";
      const res = await axios.post(`${backendUrl}/chat`, { prompt });
      setResponse(res.data);
      onChange(res.data);
    } catch (err) {
      console.error("Error sending request:", err);
    }
  };

  console.log("Response", response);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ position: "relative" }}>
          <RichTextEditor
            value={formData.bio}
            onChange={onChange}
            placeholder="Click + to add an AI-generated bio after filling other fields or write your own"
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
