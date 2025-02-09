import { Handle, Position } from "@xyflow/react";
const ExtractData = ({ data }) => {


  return (
    <div className="bg-white rounded-lg shadow-md min-w-[32rem]">
      <Handle type="target"  position={Position.Top} />
      <div className="bg-pink-50 p-4 rounded-t-lg flex items-center gap-3">
        <div className="bg-pink-600 text-white w-8 h-8 flex items-center justify-center rounded">
          AI
        </div>
        <div className="flex-grow">
          <div className="text-gray-600 text-sm">Using AI</div>
          <div className="text-gray-800 font-semibold">Extract Data</div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Yes</span>
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
          <label className="block font-medium mb-1">Extract?</label>
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
      <Handle type="source"  position={Position.Bottom} />
    </div>
  );
};

export default ExtractData