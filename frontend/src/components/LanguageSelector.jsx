// frontend/src/components/LanguageSelector.jsx

import React from 'react';
import languageList from '../utils/languageList';
import '../styles/LanguageSelector.css';


const LanguageSelector = ({ label, selected, onChange }) => {
  return (
    <div className="language-selector">
      <label>
        {label}
        <select value={selected} onChange={(e) => onChange(e.target.value)}>
          {languageList.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default LanguageSelector;
