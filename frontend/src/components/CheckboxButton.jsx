// frontend/src/components/CheckboxButton.jsx

import React from 'react';
import '../styles/CheckboxButton.css';

const CheckboxButton = ({ id = "toggle", checked, onChange }) => {
  return (
    <div className="toggle-cont">
      <input
        className="toggle-input"
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label className="toggle-label" htmlFor={id}>
        <div className="cont-label-play">
          <span className="label-play"></span>
        </div>
      </label>
    </div>
  );
};

export default CheckboxButton;
