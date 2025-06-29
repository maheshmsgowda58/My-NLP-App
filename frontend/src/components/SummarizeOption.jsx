// frontend/src/components/SummarizeOption.jsx

import React from 'react';

const SummarizeOption = ({ summaryType, setSummaryType, summaryLength, setSummaryLength }) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <div>
        <label className="font-semibold mr-2">Summary Type:</label>
        <select
          value={summaryType}
          onChange={(e) => setSummaryType(e.target.value)}
          className="border rounded p-1"
        >
          <option value="abstractive">Abstractive</option>
          <option value="extractive">Extractive</option>
        </select>
      </div>

      <div>
        <label className="font-semibold mr-2">Summary Length:</label>
        <select
          value={summaryLength}
          onChange={(e) => setSummaryLength(e.target.value)}
          className="border rounded p-1"
        >
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>
      </div>
    </div>
  );
};

export default SummarizeOption;
