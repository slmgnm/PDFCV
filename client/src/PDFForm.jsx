import React, { useState, useRef, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import portfolioSVG from "./portfolio.svg";
import "./PDFForm.css";
import { PDFExport } from "@progress/kendo-react-pdf";
import OpenAI from "./Openai.jsx";
// import AddIcon from "@mui/icons-material/Add";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import SocialLinks from "./SocialLinks";
import placeholder from "./assets/user.png";
const CVForm = () => {
  const pdfExportComponent = useRef(null);
  const storedData = localStorage.getItem("formData");
  const initialFormData = storedData
    ? JSON.parse(storedData)
    : {
        name: "",
        subtitle: "",
        bio: "",
        phone: "",
        address: "",
        email: "",
        education: [""],
        experience: [""],
        skills: [""],
        languages: [""],
        github: "",
        linkedin: "",
        portfolio: "",
        image: "",
      };
  console.log("placeholder", placeholder);
  const [formData, setFormData] = useState(initialFormData);
  useEffect(() => {
    // storing input name
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);
  console.log("formData", formData);

  const handleLinkChange = (socialMedia, link) => {
    setFormData((prevData) => ({
      ...prevData,
      [socialMedia]: link,
    }));
  };
  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const image = e.target.files[0];

    // Read the image as a base64 string
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData({
        ...formData,
        image: event.target.result,
      });
    };
    reader.readAsDataURL(image);
  };

  const handleLanguageChange = (index, event) => {
    const { value } = event.target;
    setFormData((prevState) => {
      const newLanguages = [...prevState.languages];
      newLanguages[index] = value;
      if (index === newLanguages.length - 1 && value.trim() !== "") {
        // Add a new empty language field if the last field is not empty
        newLanguages.push("");
      }
      return {
        ...prevState,
        languages: newLanguages,
      };
    });
  };
  const handleExperienceChange = (index, event) => {
    const { value } = event.target;
    setFormData((prevState) => {
      const newExperience = [...prevState.experience];
      newExperience[index] = value;
      if (index === newExperience.length - 1 && value.trim() !== "") {
        // Add a new empty language field if the last field is not empty
        newExperience.push("");
      }
      return {
        ...prevState,
        experience: newExperience,
      };
    });
  };

  const handleEdChange = (index, event) => {
    const { value } = event.target;
    setFormData((prevState) => {
      const newEd = [...prevState.education];
      newEd[index] = value;
      if (index === newEd.length - 1 && value.trim() !== "") {
        // Add a new empty language field if the last field is not empty
        newEd.push("");
      }
      return {
        ...prevState,
        education: newEd,
      };
    });
  };
  const handleSkillsChange = (index, event) => {
    const { value } = event.target;
    setFormData((prevState) => {
      const newSkill = [...prevState.skills];
      newSkill[index] = value;
      if (index === newSkill.length - 1 && value.trim() !== "") {
        // Add a new empty language field if the last field is not empty
        newSkill.push("");
      }
      return {
        ...prevState,
        skills: newSkill,
      };
    });
  };
  const handleTextareaInput = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const handleExportPDF = () => {
    const pdfName = `CV-${formData.name}.pdf`;
    pdfExportComponent.current.save(pdfName);
    // console.log("current", pdfExportComponent.current);
  };

  return (
    <div className="main-container">
      <PDFExport
        ref={pdfExportComponent}
        paperSize="auto"
        scale={1}
        style={{ height: "auto" }}
        fileName={`${formData.name}-Resume`}
      >
        <div className="container">
          <div className="left">
            <div className="cv-image-container">
              <div className="cv-image-wrapper">
                <img
                  src={formData.image ? formData.image : placeholder}
                  alt="Profile picture"
                  className="cv-image-preview"
                />
                <label className="upload-icon">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <LibraryAddIcon className="addIcon" />
                </label>
              </div>
            </div>

            <div className="cv-header-text">
              <div className="field">
                <input
                  className="input"
                  type="text"
                  name="name"
                  placeholder="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="field">
                <input
                  className="subtitleInput"
                  type="text"
                  name="subtitle"
                  placeholder="Current title"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                />
              </div>
              <div className="">
                <SocialLinks
                  formData={formData}
                  onGithubLinkChange={handleLinkChange}
                />
              </div>
              <div className="field">
                <input
                  className="inputContact"
                  type="text"
                  name="address"
                  placeholder="address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <input
                  className="inputContact"
                  type="text"
                  name="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <input
                  className="inputContact"
                  type="text"
                  name="phone"
                  placeholder="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="lang">
                <h4>Languages</h4>
                <hr />
                {formData.languages.map((language, index) => (
                  <div key={index} className="field">
                    <input
                      className="inputContact"
                      type="text"
                      name={`language-${index}`}
                      value={language}
                      onChange={(event) => handleLanguageChange(index, event)}
                      placeholder="Add a language"
                    />
                  </div>
                ))}
              </div>
              <div className="skills">
                <h4>Skills</h4>
                <hr />
                {formData.skills.map((skill, index) => (
                  <div key={index} className="field">
                    <input
                      className="inputContact"
                      type="text"
                      name={`skill-${index}`}
                      value={skill}
                      onChange={(event) => handleSkillsChange(index, event)}
                      placeholder="Insert a skill"
                    />
                  </div>
                ))}
              </div>
              <hr />
            </div>
          </div>
          <div className="right">
            <h2>Bio</h2>
            <hr />
            <div>
              <OpenAI formData={formData} />
            </div>

            <h2>Experience</h2>
            <hr />
            {formData.experience.map((exp, index) => (
              <div key={index}>
                <textarea
                  className=""
                  type="text"
                  rows="1"
                  style={{ resize: "none", overflow: "hidden" }}
                  onInput={handleTextareaInput}
                  name={`experience-${index}`}
                  value={exp}
                  onChange={(event) => handleExperienceChange(index, event)}
                  placeholder="Start date-   Your Most recent Position here
                  End date    Company name 
                  -Task Name
                  "
                />
              </div>
            ))}
            <h2>Education</h2>
            <hr />
            {formData.education.map((exp, index) => (
              <div key={index}>
                <textarea
                  className=""
                  type="text"
                  rows="1"
                  style={{ resize: "none", overflow: "hidden" }}
                  onInput={handleTextareaInput}
                  name={`education-${index}`}
                  value={exp}
                  onChange={(event) => handleEdChange(index, event)}
                  placeholder=" 2018-    Degree name
                  End date    Institute name"
                />
              </div>
            ))}
          </div>
        </div>
      </PDFExport>
      <div className="export-btn">
        <button className="btn" onClick={handleExportPDF}>
          Export CV as PDF
        </button>
      </div>
    </div>
  );
};

export default CVForm;
