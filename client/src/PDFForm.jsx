import React, { useState, useRef, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import portfolioSVG from "./portfolio.svg";
import "./PDFForm.css";
import { PDFExport } from "@progress/kendo-react-pdf";
import OpenAI from "./Openai.jsx";
// import AddIcon from "@mui/icons-material/Add";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import SocialLinks from "./SocialLinks";
import placeholder from "./assets/user.png";
import RichTextEditor from "./RichText";
import { IconButton } from "@mui/material";
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
  const handleBio = (newBio) => {
    setFormData((prevData) => ({
      ...prevData,
      bio: newBio,
    }));
  };
  const addField = (fieldName) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: [...prevState[fieldName], ""],
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
  const handleExperienceChange = (index, newValue) => {
    setFormData((prevState) => {
      const newExp = [...prevState.experience];
      newExp[index] = newValue;
      if (index === newExp.length - 1 && newValue.trim() !== "") {
        newExp.push("");
      }
      return {
        ...prevState,
        experience: newExp,
      };
    });
  };

  const handleEdChange = (index, newValue) => {
    setFormData((prevState) => {
      const newEd = [...prevState.education];
      newEd[index] = newValue;
      if (index === newEd.length - 1 && newValue.trim() !== "") {
        // Add a new empty education field if the last field is not empty
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

  const handleExportPDF = () => {
    const pdfName = `CV-${formData.name}.pdf`;
    pdfExportComponent.current.save(pdfName);
    // console.log("current", pdfExportComponent.current);
  };
  const removeField = (fieldName, index) => {
    setFormData((prevState) => {
      const newField = [...prevState[fieldName]];
      newField.splice(index, 1);
      return {
        ...prevState,
        [fieldName]: newField,
      };
    });
  };

  return (
    <div className="main-container">
      <PDFExport
        ref={pdfExportComponent}
        paperSize="auto"
        style={{ height: "auto", width: "8.5in" }}
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
                  className="name"
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
            <div className="bio">
              <h2>Bio</h2>
              <hr />
              <div>
                <OpenAI formData={formData} onChange={handleBio} />
              </div>
            </div>
            <div className="experience">
              <h2>Experience</h2>
              <hr />
              {formData.experience.map((exp, index) => (
                <div className="field" key={index}>
                  <RichTextEditor
                    value={exp}
                    onChange={(newExp) => handleExperienceChange(index, newExp)}
                  />
                  <button
                    className="removeField"
                    aria-label="delete"
                    color="primary"
                  >
                    <RemoveCircleOutlineIcon
                      onClick={() => removeField("experience", index)}
                    />
                  </button>
                </div>
              ))}
              <button className="addField">
                <AddCircleOutlineIcon onClick={() => addField("experience")} />
              </button>
            </div>
            <div className="education">
              <h2>Education</h2>
              <hr />
              {formData.education.map((edu, index) => (
                <div className="field" key={index}>
                  <RichTextEditor
                    value={edu}
                    onChange={(newEd) => handleEdChange(index, newEd)}
                    placeholder="education"
                  />
                  <button
                    className="removeField"
                    aria-label="delete"
                    color="primary"
                  >
                    <RemoveCircleOutlineIcon
                      onClick={() => removeField("education", index)}
                    />
                  </button>
                </div>
              ))}
              <button className="addField">
                <AddCircleOutlineIcon onClick={() => addField("education")} />
              </button>
            </div>
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
