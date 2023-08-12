import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles
import "./RichTextEditor.css"; // Import your custom CSS

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const handleEditorChange = (newValue, _delta, _source, _editor) => {
    onChange(newValue);
  };

  return (
    <div className="richTextEditorContainer">
      <ReactQuill
        value={value}
        onChange={handleEditorChange}
        placeholder={ placeholder }
      />
    </div>
  );
};

export default RichTextEditor;
