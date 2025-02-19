// import React, { useState } from 'react';
// import axios from 'axios';
// import { useCallback } from 'react';
// import { NodePalette } from './Components/NodePalette';
// import { nodeHandlers } from './utils/nodeHandlers';
// import AskAINode from './Components/Nodes/AskAINode';
// import ExtractData from './Components/Nodes/ExtractData';
// import Summarizer from './Components/Nodes/SummarizerNode';
// import Categorizer from './Components/Nodes/CategorizerNode';
// import Analyzer from './Components/Nodes/AnalyzerNode';
// import PDFNode from './Components/Nodes/PDFNode';


// import {
//   ReactFlow,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   MiniMap,
//   getIncomers,
//   getOutgoers,
// } from '@xyflow/react';
// import '@xyflow/react/dist/style.css';

// const App = () => {
//   const [showPalette, setShowPalette] = useState(false);
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);

//    // Helper function to find start nodes
//   const findStartNodes = useCallback((nodes, edges) => {
//     return nodes.filter((node) => {
//       const incomers = getIncomers(node, nodes, edges);
//       return incomers.length === 0;
//     });
//   }, []);

//   // Helper function to find next nodes
//   const getNextNodes = useCallback((node, nodes, edges) => {
//     const val = getOutgoers(node, nodes, edges)
//     console.log("ohh bhaii next nodes ", val)
//     return getOutgoers(node, nodes, edges);
    
//   }, []);

//   // Execute the entire flow
//   const executeFlow = async () => {
//     const startNodes = findStartNodes(nodes, edges);

//     if (startNodes.length === 0) {
//       console.log('No start nodes found. Add nodes and connect them to create a flow.');
//       return;
//     }

//     console.log('Starting flow execution...');
//     console.log('Start nodes:', startNodes.map((n) => n.id));

//     const executedNodes = new Set(); // A Set that keeps track of the IDs of nodes that have already been executed. This prevents a node from being executed more than once.
//     const nodeOutputs = new Map(); //A Map that stores the results of each node's execution, keyed by the node's ID.
    

//     const executeNodeAndChildren = async (node) => {
//       if (executedNodes.has(node.id)) return;
    
//       // Get the output of the previous node (if any)
//       const previousNodeOutput = nodeOutputs.get(node.id)?.output || null;
    
//       // Execute current node using the dynamic handler
//       const handler = nodeHandlers[node.type];
//       if (!handler) {
//         console.error(`No handler found for node type: ${node.type}`);
//         return;
//       }
    
//       // Pass the previous node's output to the current node
//       const result = await handler(node, previousNodeOutput);
//       nodeOutputs.set(node.id, result);
//       executedNodes.add(node.id);
    
//       console.log("Executed Nodes set", executedNodes);
//       console.log("Nodeoutputs map", nodeOutputs);
    
//       // Get next nodes
//       const nextNodes = getNextNodes(node, nodes, edges);
    
//       if (nextNodes.length === 0) {
//         console.log(`Flow stopped at node: ${node.type} (${node.id})`);
//       } else {
//         // Execute all children
//         for (const nextNode of nextNodes) {
//           await executeNodeAndChildren(nextNode);
//         }
//       }
//     };


//     // Execute flow starting from each start node
//     for (const startNode of startNodes) {
//       await executeNodeAndChildren(startNode);
//     }

//     // Log final results
//     console.log('\nExecution Results:');
//     nodeOutputs.forEach((result, nodeId) => {
//       console.log(`Node ${nodeId}:`, result);
//     });
//   };

  
//   const nodeTypes = {
//     askAI: AskAINode,
//     pdfGenerator: PDFNode,
//     extractData : ExtractData,
//     summarizer : Summarizer,
//     categorizer : Categorizer,
//     analyzer : Analyzer,

//   };

//   const onConnect = useCallback(
//     (params) => setEdges((eds) => addEdge(params, eds)),
//     [setEdges]
//   );

  
//   const onDragStart = (event, nodeData) => {
//     const transferData = {
//       type: nodeData.type,
//       label: nodeData.label
//     };
//     event.dataTransfer.setData('application/reactflow', JSON.stringify(transferData));
//     event.dataTransfer.effectAllowed = 'move';
//   };

//   const onDrop = (event) => {
//     event.preventDefault();
    
//     try {
//       const reactFlowBounds = event.currentTarget.getBoundingClientRect();
//       const transferData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      
//       if (!transferData) return;

//       const position = {
//         x: event.clientX - reactFlowBounds.left,
//         y: event.clientY - reactFlowBounds.top
//       };

//       const newNode = {
//         id: `${transferData.type}-${Date.now()}`,
//         type: transferData.type,
//         position,
//         data: { 
//           label: transferData.label
//         }
//       };

//       setNodes((nds) => nds.concat(newNode));
//     } catch (error) {
//       console.error('Error dropping node:', error);
//     }
//   };

//   const onDragOver = (event) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = 'move';
//   };



//   return (
//     <div className='w-screen h-screen'>
//       <button
//         onClick={() => setShowPalette(true)}
//         className="absolute top-5 left-5 z-10 h-10 w-10 bg-pink-300 rounded-full text-pink-900 flex items-center justify-center text-2xl p-7 font-medium hover:bg-pink-400 transition-colors"
//       >
//         +
//       </button> 

//       <button
//         onClick={executeFlow}
//         className="absolute top-5 right-5 z-10 h-10 w-10 bg-pink-300 rounded-full  text-pink-900 flex items-center justify-center p-7 font-medium hover:bg-pink-400 transition-colors"
//       >
//         ▶
//       </button>


//       {showPalette && (
//         <NodePalette 
//           onClose={() => setShowPalette(false)}
//           onDragStart={onDragStart}
//         />
//       )}

//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         nodeTypes={nodeTypes}
//         onConnect={onConnect}
//         onDrop={onDrop}
//         onDragOver={onDragOver}
//       >
//         <Controls />
//         <Background variant="dots" gap={10} size={1} />
//         <MiniMap/>
//       </ReactFlow>
//     </div>
//   );
// };

// export default App;

import React, { useState } from 'react';
import axios from 'axios';
import { useCallback } from 'react';
import { NodePalette } from './Components/NodePalette';
import { nodeHandlers } from './utils/nodeHandlers';
import AskAINode from './Components/Nodes/AskAINode';
import ExtractData from './Components/Nodes/ExtractData';
import Summarizer from './Components/Nodes/SummarizerNode';
import Categorizer from './Components/Nodes/CategorizerNode';
import Analyzer from './Components/Nodes/AnalyzerNode';
import PDFNode from './Components/Nodes/PDFNode';
import api from './api';

import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  getIncomers,
  getOutgoers,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const App = () => {
  const [showPalette, setShowPalette] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Helper function to find start nodes
  const findStartNodes = useCallback((nodes, edges) => {
    return nodes.filter((node) => {
      const incomers = getIncomers(node, nodes, edges);
      return incomers.length === 0;
    });
  }, []);

  // Helper function to find next nodes
  const getNextNodes = useCallback((node, nodes, edges) => {
    return getOutgoers(node, nodes, edges);
  }, []);

  // Function to download PDF
  const downloadPDF = async (pdfPath) => {
    try {
      // Extract filename from path
      const filename = pdfPath.split('\\').pop();
      
      // Make request to get PDF file
      const response = await api.get(`/download-pdf/${filename}`, {
        responseType: 'blob'
      });
      
      // Create blob URL and trigger download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  // Execute the entire flow
  const executeFlow = async () => {
    if (nodes.length === 0) {
      console.log("No nodes to execute.");
      return;
    }
    
    const workflowPayload = { nodes, edges };
    
    try {
      const response = await api.post("/execute-workflow", workflowPayload);
      console.log("Workflow execution results:", response.data.results);

      // Check for PDF nodes in the results
      Object.entries(response.data.results).forEach(([nodeId, result]) => {
        // Check if this is a PDF node result and contains a PDF path
        if (nodeId.includes('pdf') && result.includes('PDF generated successfully at')) {
          // Extract the PDF path from the result
          const pdfPath = result.split('PDF generated successfully at ')[1];
          // Download the PDF
          downloadPDF(pdfPath);
        }
      });
    } catch (error) {
      console.error("Error executing workflow:", error.response?.data || error.message);
    }
  };

  const nodeTypes = {
    askAI: AskAINode,
    pdfGenerator: PDFNode,
    extractData: ExtractData,
    summarizer: Summarizer,
    categorizer: Categorizer,
    analyzer: Analyzer,
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

      <button
        onClick={executeFlow}
        className="absolute top-5 right-5 z-10 h-10 w-10 bg-pink-300 rounded-full text-pink-900 flex items-center justify-center p-7 font-medium hover:bg-pink-400 transition-colors"
      >
        ▶
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
        <MiniMap/>
      </ReactFlow>
    </div>
  );
};

export default App;