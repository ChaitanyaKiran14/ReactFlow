import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './App.css';

const AskAINode = ({ data }) => {
  return (
    <div className="ask-ai-node">
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
            className="prompt-input"
          />
        </div>
        <div className="input-section">
          <label>Context</label>
          <input 
            type="text" 
            placeholder="[Optional] This is additional context for the AI model that can be referenced in the prompt"
            className="context-input"
          />
        </div>
        <div className="input-section">
          <label>Choose AI model</label>
          <select className="model-select">
            <option>Claude 3 Haiku</option>
            <option>Claude 3 Sonnet</option>
            <option>Claude 3 Opus</option>
          </select>
          <button className="show-more">Show More Options</button>
        </div>
      </div>
    </div>
  );
};


const nodeTypes = {
  askAI: AskAINode,
};

const NodePalette = ({ onClose, onDragStart }) => {
  const paletteNodes = [
    {
      category: 'Using AI',
      items: [
        { id: 'ask-ai', label: 'Ask AI', type: 'askAI', icon: 'AI' },
        { id: 'extract-data', label: 'Extract Data', icon: '📊' },
        { id: 'summarizer', label: 'Summarizer', icon: '📝' },
        { id: 'categorizer', label: 'Categorizer', icon: '🔍' },
        { id: 'scorer', label: 'Scorer', icon: '⭐' },
      ]
    },
    {
      category: 'Web Scraping',
      items: [
        { id: 'website-scraper', label: 'Website Scraper', icon: '🌐' },
        { id: 'web-agent', label: 'Web Agent Scraper', icon: '🤖' },
        { id: 'random', label: 'Random', icon: '🤖' },
      ]
    }
  ];

  return (
    <div className="node-library">
      <div className="library-header">
        <div className="tab-container">
          <button className="tab active">Node Library</button>
          <button className="tab">Subflow Library</button>
        </div>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search or ask anything..." />
      </div>
      <div className="category-tabs">
        <button className="category-tab active">Core Nodes</button>
        <button className="category-tab">Integrations</button>
        <button className="category-tab">Triggers</button>
        <button className="category-tab">Custom Nodes</button>
      </div>
      <div className="nodes-container">
        {paletteNodes.map((category) => (
          <div key={category.category} className="category-section">
            <h3 className="category-title">{category.category}</h3>
            <div className="category-items">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="node-item"
                  draggable
                  onDragStart={(event) => onDragStart(event, item)}
                >
                  <span className="node-icon">{item.icon}</span>
                  <span className="node-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showPalette, setShowPalette] = useState(false);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragStart = (event, node) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(node));
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();
    
    const node = JSON.parse(event.dataTransfer.getData('application/reactflow'));
    const position = {
      x: event.clientX - event.currentTarget.getBoundingClientRect().left,
      y: event.clientY - event.currentTarget.getBoundingClientRect().top,
    };

    const newNode = {
      id: `${node.id}-${Date.now()}`,
      type: node.type || 'default',
      position,
      data: { label: node.label },
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <button
        className="add-node-button"
        onClick={() => setShowPalette(true)}
      >
        +
      </button>

      {showPalette && (
        <NodePalette
          onClose={() => setShowPalette(false)}
          onDragStart={onDragStart}
        />
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}