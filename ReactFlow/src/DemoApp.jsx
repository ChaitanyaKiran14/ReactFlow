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


// Custom Ask AI Node Component
const AskAINode = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md min-w-[32rem]">
      <div className="bg-pink-50 p-4 rounded-t-lg flex items-center gap-3">
        <div className="bg-pink-600 text-white w-8 h-8 flex items-center justify-center rounded">
          AI
        </div>
        <div className="flex-grow">
          <div className="text-gray-600 text-sm">Using AI</div>
          <div className="text-gray-800 font-semibold">Ask AI</div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Loop Mode</span>
          <label className="relative inline-block w-10 h-5">
            <input type="checkbox" className="hidden peer" />
            <div className="absolute cursor-pointer inset-0 bg-gray-300 peer-checked:bg-pink-600 rounded-full">
              <div className="absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
            </div>
          </label>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        <div>
          <label className="block font-medium mb-1">Prompt</label>
          <input 
            type="text"
            placeholder="Summarize the article in the context"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block font-medium mb-1">Context</label>
          <input
            type="text"
            placeholder="[Optional] This is additional context for the AI model that can be referenced in the prompt"
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block font-medium mb-1">Choose AI model</label>
          <select className="w-full p-2 border border-gray-300 rounded mb-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent">
            <option>Claude 3 Haiku</option>
            <option>Claude 3 Sonnet</option>
            <option>Claude 3 Opus</option>
          </select>
          <button className="text-gray-600 text-sm hover:text-gray-800">
            Show More Options
          </button>
        </div>
      </div>
    </div>
  );
};

// Node Library/Palette Component
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
      ]
    }
  ];

  return (
    <div className="absolute top-5 left-5 z-10 w-72 bg-white rounded-lg shadow-lg">
      <div className="border-b border-gray-200 p-3">
        <div className="flex gap-4 mb-2">
          <button className="text-pink-600 border-b-2 border-pink-600 pb-1">
            Node Library
          </button>
          <button className="text-gray-600 pb-1">
            Subflow Library
          </button>
        </div>
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>
      </div>

      <div className="p-3">
        <input
          type="text"
          placeholder="Search or ask anything..."
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="flex gap-2 p-3 overflow-x-auto">
        <button className="px-3 py-1 bg-gray-100 rounded-full text-sm whitespace-nowrap">
          Core Nodes
        </button>
        <button className="px-3 py-1 border border-gray-300 rounded-full text-sm whitespace-nowrap">
          Integrations
        </button>
        <button className="px-3 py-1 border border-gray-300 rounded-full text-sm whitespace-nowrap">
          Triggers
        </button>
        <button className="px-3 py-1 border border-gray-300 rounded-full text-sm whitespace-nowrap">
          Custom Nodes
        </button>
      </div>

      <div className="p-3">
        {paletteNodes.map((category) => (
          <div key={category.category} className="mb-4">
            <h3 className="text-sm font-medium mb-2">{category.category}</h3>
            <div className="space-y-2">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-2 bg-gray-50 rounded cursor-grab hover:bg-gray-100"
                  draggable
                  onDragStart={(event) => onDragStart(event, item)}
                >
                  <span className="w-6 h-6 flex items-center justify-center bg-pink-600 text-white rounded text-xs">
                    {item.icon}
                  </span>
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showPalette, setShowPalette] = useState(false);

  const nodeTypes = {
    askAI: AskAINode,
  };

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
    <div className="w-screen h-screen">
      <button className="absolute top-5 left-5 z-10 w-10 h-10 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 flex items-center justify-center text-2xl" onClick={() => setShowPalette(true)} >
        +
      </button>

      {showPalette && (
        <NodePalette
          onClose={() => setShowPalette(false)}
          onDragStart={onDragStart}
        />
      )}

      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onDrop={onDrop} onDragOver={onDragOver}  nodeTypes={nodeTypes}>
        <Controls />
        <Background variant="dots" gap={12} size={1} />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default App;