import React from 'react';
import { Handle, Position } from '@xyflow/react';

const AskAINode = ({ data }) => {
  return (
    <div className="ask-ai-node">
      <Handle type="target" position={Position.Top} />
      <div className="node-header">
        <div className="icon-container">
          <div className="ai-icon">AI</div>
        </div>
        <div className="header-content">
          <div className="header-title">Using AI</div>
          <div className="header-subtitle">Ask AI</div>
        </div>
        <div className="loop-mode">
          Loop Mode
          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      </div>
      <div className="node-content">
        <div className="input-section">
          <label>Prompt</label>
          <input 
            type="text" 
            placeholder="Summarize the article in the context"
            value={data.prompt || ''}
            onChange={(e) => data.onChange?.('prompt', e.target.value)}
          />
        </div>
        <div className="input-section">
          <label>Context</label>
          <input 
            type="text" 
            placeholder="[Optional] Additional context"
            value={data.context || ''}
            onChange={(e) => data.onChange?.('context', e.target.value)}
          />
        </div>
        <div className="input-section">
          <label>Choose AI model</label>
          <select 
            className="model-select"
            value={data.model || 'claude-3-haiku'}
            onChange={(e) => data.onChange?.('model', e.target.value)}
          >
            <option value="claude-3-haiku">Claude 3 Haiku</option>
            <option value="claude-3-sonnet">Claude 3 Sonnet</option>
            <option value="claude-3-opus">Claude 3 Opus</option>
          </select>
          <button className="show-more">Show More Options</button>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default AskAINode;