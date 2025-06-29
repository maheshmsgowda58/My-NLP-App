// frontend/src/components/TranslationButton.jsx
import React from "react";
import "../styles/TranslateSummaryButton.css";

const TranslationButton = ({ onClick, text = "Try Translation" }) => {
  return (
    <button onClick={onClick}>
      {text}
      <div className="star-1">{starSVG}</div>
      <div className="star-2">{starSVG}</div>
      <div className="star-3">{starSVG}</div>
      <div className="star-4">{starSVG}</div>
      <div className="star-5">{starSVG}</div>
      <div className="star-6">{starSVG}</div>
    </button>
  );
};

const starSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    version="1.1"
    viewBox="0 0 784.11 815.53"
    style={{
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      imageRendering: "optimizeQuality",
      fillRule: "evenodd",
      clipRule: "evenodd",
    }}
  >
    <g>
      <path
        className="fil0"
        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 
           207.96,29.37 371.12,197.68 392.05,407.74 
           20.93,-210.06 184.09,-378.37 392.05,-407.74 
           -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
      />
    </g>
  </svg>
);

export default TranslationButton;
