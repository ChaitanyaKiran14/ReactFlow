import React, { useState } from 'react';
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
import { useCallback } from 'react';

const NodePalette = ({onClose}) => {


  return(
    <div className="absolute top-5 left-5 z-10 w-72 bg-white rounded-lg shadow-lg">
      <h1> I am your dialogue box</h1>
      <input type='search' placeholder='Search or ask for anything'/>
      <button onClick={onClose} className='text-pink-500 '>x</button>
    </div>
  )
}




const App = () => {
  const [showPalette, setShowPalette] = useState(false)

  return(
  <div className='w-screen h-screen'>
    <button onClick={()=> setShowPalette(true)} className=' absolute top-5 left-5 z-10 h-10 w-10 bg-pink-300  rounded-full  text-pink-900'>
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


