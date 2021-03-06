import React from 'react';

const WikipediaViewerInput = (props) => {
  const { onUpdateSearchTerm, searchTerm, topOrBottom } = props;

  return (
    <div className="wikipedia-viewer-input input-group">
      <input
        autoFocus={topOrBottom === 'top'}
        value={searchTerm}
        onChange={onUpdateSearchTerm}
        className="text-center input-group-field" 
        type="text"
        placeholder="Enter Search Term"
      />
    </div>
  );
}

export default WikipediaViewerInput;
