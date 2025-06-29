// src/components/InputOutputBox.jsx

import React from 'react';
import CopyButton from './CopyButton';
import DownloadButton from './DownloadButton';
import '../styles/InputOutputBox.css';

const InputOutputBox = ({
  inputText,
  setInputText,
  outputText,
  onCopy,
  onDownload,
  disableInput = false,
  loading = false,
}) => {
  return (
    <div className="input-output-box">
      <div className="box">
        <label htmlFor="input">Input Text</label>
        <textarea
          id="input"
          rows="6"
          placeholder="Enter your text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={disableInput || loading}
        />
      </div>

      <div className="box">
        <label htmlFor="output">Output Text</label>
        <textarea
          id="output"
          rows="6"
          placeholder={loading ? 'Processing...' : 'Output will appear here...'}
          value={outputText}
          readOnly
        />
        <div className="output-actions">
          <CopyButton onClick={onCopy} disabled={!outputText || loading} />
          <DownloadButton onClick={onDownload} disabled={!outputText || loading} />
        </div>
      </div>
    </div>
  );
};

export default InputOutputBox;
