import React, { useState } from 'react';
import { useCallback } from 'react';
import { NodePalette } from './Components/NodePalette';
import AskAINode from './Components/Nodes/AskAINode';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const App = () => {
  const [showPalette, setShowPalette] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  const nodeTypes = {
    askAI: AskAINode
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  
  const onDragStart = (event, nodeData) => {
    const transferData = {
      type: nodeData.type,
      label: nodeData.label
    };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(transferData));
    event.dataTransfer.effectAllowed = 'move';
  };

 

  const onDrop = (event) => {
    event.preventDefault();
    
    try {
      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const transferData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      
      if (!transferData) return;

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top
      };

      const newNode = {
        id: `${transferData.type}-${Date.now()}`,
        type: transferData.type,
        position,
        data: { 
          label: transferData.label
        }
      };

      setNodes((nds) => nds.concat(newNode));
    } catch (error) {
      console.error('Error dropping node:', error);
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  return (
    <div className='w-screen h-screen'>
      <button
        onClick={() => setShowPalette(true)}
        className="absolute top-5 left-5 z-10 h-10 w-10 bg-pink-300 rounded-full text-pink-900 flex items-center justify-center text-2xl p-7 font-medium hover:bg-pink-400 transition-colors"
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
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <Controls />
        <Background variant="dots" gap={10} size={1} />
      </ReactFlow>
    </div>
  );
};

export default App;