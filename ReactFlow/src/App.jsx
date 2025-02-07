import React, { useState } from 'react';
import { useCallback } from 'react';
import { NodePalette } from './Components/NodePalette';
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



const App = () => {
  const [showPalette, setShowPalette] = useState(false)

  return(
  <div className='w-screen h-screen'>
    <button
      onClick={() => setShowPalette(true)}
      className="absolute top-5 left-5 z-10 h-10 w-10 bg-pink-300 rounded-full text-pink-900  flex items-center justify-center text-2xl p-7 font-medium hover:bg-pink-400 transition-colors"
    >
      +
    </button>

      {showPalette && (
      <NodePalette 
      onClose={()=> setShowPalette(false)}
      
      />
    )}

      <ReactFlow>
      <Controls />
      <Background variant="dots" gap={10} size={1} />
      </ReactFlow>
      
    </div>
  )
}

export default App


