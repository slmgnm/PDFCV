import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import Portfolio from "./assets/portfolio-svgrepo-com.svg";
import "./PDFForm.css";
export default function socialLinks({ formData, onGithubLinkChange }) {
  const { github, linkedin, portfolio } = formData;

  const handleLinkChange = (socialMedia, link) => {
    onGithubLinkChange(socialMedia, link);
  };

  const githubInput = (
    <input
      className="inputContact"
      type="text"
      value={github}
      placeholder="GitHub link"
      onChange={(e) => handleLinkChange("github", e.target.value)}
    />
  );
  const linkedInInput = (
    <input
      className="inputContact"
      type="text"
      value={linkedin}
      placeholder="Linkedin link"
      onChange={(e) => handleLinkChange("linkedin", e.target.value)}
    />
  );
  const portfolioInput = (
    <input
      className="inputContact"
      type="text"
      value={portfolio}
      placeholder="Portfolio link"
      onChange={(e) => handleLinkChange("portfolio", e.target.value)}
    />
  );
  return (
    <div className="social-links">
      <a
        href={formData.github}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.preventDefault()}
      >
        <Tooltip title={githubInput} arrow>
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            alt="GitHub"
            width="20"
            height="20"
          />
        </Tooltip>
      </a>
      <a
        href={formData.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.preventDefault()}
      >
        <Tooltip title={linkedInInput} arrow>
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
            alt="linkedin"
            width="20"
            height="20"
          />
        </Tooltip>
      </a>
      <a
        href={formData.portfolio}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.preventDefault()}
      >
        <Tooltip title={portfolioInput} arrow>
          <img src={Portfolio} alt="portfolio" width="20" height="20" />
        </Tooltip>
      </a>
    </div>
  );
}
