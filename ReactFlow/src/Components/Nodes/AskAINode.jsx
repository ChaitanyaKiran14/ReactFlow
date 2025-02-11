import { Handle, Position } from '@xyflow/react';
import { useState } from 'react';

const AskAINode = ({ data, id }) => {
  const [prompt, setPrompt] = useState(data.prompt || '');
  const [context, setContext] = useState(data.context || '');
  const [model, setModel] = useState(data.model || 'Claude 3 Haiku');

  const updateNodeData = () => {

    data.prompt = prompt;
    data.context = context;
    data.model = model;
  };

  return (
    <div className="bg-white rounded-lg shadow-md min-w-[32rem]">
      <Handle type="target" position={Position.Top} />
      <div className="bg-pink-50 p-4 rounded-t-lg flex items-center gap-3">
        <div className="bg-pink-600 text-white w-8 h-8 flex items-center justify-center rounded">
          AI
        </div>
        <div className="flex-grow">
          <div className="text-gray-600 text-sm">Using AI</div>
          <div className="text-gray-800 font-semibold">Ask AI</div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="block font-medium mb-1">Prompt</label>
          <input
            type="text"
            placeholder="Enter your prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onBlur={updateNodeData}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Context</label>
          <input
            type="text"
            placeholder="Enter additional context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            onBlur={updateNodeData}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Choose AI model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            onBlur={updateNodeData}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option>Claude 3 Haiku</option>
            <option>Claude 3 Sonnet</option>
            <option>Claude 3 Opus</option>
          </select>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default AskAINode;