import React from "react";

export const ExecutionPanel = ({ isOpen, output, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="execution-panel">
      <div className="panel-header">
        <h3>Execution Results</h3>
        <button onClick={onClose}>×</button>
      </div>
      <div className="panel-content">
        <pre>{JSON.stringify(output, null, 2)}</pre>
      </div>
    </div>
  );
};