import React from 'react';

export const NodePalette = ({ onClose, onDragStart }) => {
  const nodeTypes = [
    {
      type: 'askAI',
      label: 'Ask AI',
      icon: 'AI',
      category: 'AI Tools'
    },
    {
      type: 'extractData',
      label: 'Extract Data',
      icon: '📊',
      category: 'Data Processing'
    }
    // Add more node types here
  ];

  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({
      type: nodeType.type,
      data: { label: nodeType.label }
    }));
    event.dataTransfer.effectAllowed = 'move';
    onDragStart?.(event, nodeType);
  };

  return (
    <div className="node-palette">
      <div className="palette-header">
        <h3>Add Node</h3>
        <button onClick={onClose} className="close-button">×</button>
      </div>
      <div className="palette-content">
        {nodeTypes.map((nodeType, index) => (
          <div
            key={index}
            className="palette-item"
            draggable
            onDragStart={(e) => handleDragStart(e, nodeType)}
          >
            <div className="item-icon">{nodeType.icon}</div>
            <div className="item-details">
              <div className="item-label">{nodeType.label}</div>
              <div className="item-category">{nodeType.category}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};