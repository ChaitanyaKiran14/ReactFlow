import React from "react";
import { Search, X } from "lucide-react";

export const NodePalette = ({ onClose, onDragStart }) => {
  const paletteNodes = [
    {
      category: 'Using AI',
      description: "Leverage AI for various tasks",
      count: 15,
      nodeIcon: "AI",
      items: [
        { 
          id: 'ask-ai',  label: 'Ask AI',  type: 'askAI',  icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-cpu mr-1" style={{ color: 'rgb(246, 112, 183)' }}> <rect width="16" height="16" x="4" y="4" rx="2" /> <rect width="6" height="6" x="9" y="9" rx="1" />
              <path d="M15 2v2" />
              <path d="M15 20v2" />
              <path d="M2 15h2" />
              <path d="M2 9h2" />
              <path d="M20 15h2" /> <path d="M20 9h2" /><path d="M9 2v2" />
              <path d="M9 20v2" />  </svg>)
        },
        { 
          id: 'extract-data', 
          label: 'Extract Data', 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hard-drive-upload mr-1" style={{ color: 'rgb(246, 112, 183)' }}>
              <path d="m16 6-4-4-4 4" />
              <path d="M12 2v8" />
              <rect width="20" height="8" x="2" y="14" rx="2" />
              <path d="M6 18h.01" />
              <path d="M10 18h.01" />
            </svg>
          )
        },
        { 
          id: 'summarizer', 
          label: 'Summarizer', 
          icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scan-eye mr-1" style={{ color: 'rgb(246, 112, 183)' }}>
              <path d="M3 7V5a2 2 0 0 1 2-2h2" />
              <path d="M17 3h2a2 2 0 0 1 2 2v2" />
              <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
              <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
              <circle cx="12" cy="12" r="1" />
              <path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0" />
            </svg>)
        },
        { 
          id: 'categorizer', 
          label: 'Categorizer', 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scroll-text mr-1" style={{ color: 'rgb(246, 112, 183)' }}>
              <path d="M15 12h-5" />
              <path d="M15 8h-5" />
              <path d="M19 17V5a2 2 0 0 0-2-2H4" />
              <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />
            </svg>
          )
        },
        { 
          id: 'analyzer', 
          label: 'Analyzer', 
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scan-eye mr-1" style={{ color: 'rgb(246, 112, 183)' }}>
              <path d="M3 7V5a2 2 0 0 1 2-2h2" />
              <path d="M17 3h2a2 2 0 0 1 2 2v2" />
              <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
              <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
              <circle cx="12" cy="12" r="1" />
              <path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0" />
            </svg>
          )
        },
      ]
    },
    {
      category: 'Web Scraping',
      description: "Extract Data from Websites automatically",
      count: 5,
      nodeIcon : "WEB" ,
      items: [
        { id: 'website-scraper', label: 'Website Scraper', icon: '🌐' },
        { id: 'web-agent', label: 'Web Agent Scraper', icon: '🤖' },
        { id: 'website-crawler', label: 'Website Crawler', icon: '🤖' },
        { id: 'job-posting-scraper', label: 'Job Posting Scraper', icon: '🌐' },
      ]
    },
  
   
  ];
  return (
    <div className="fixed top-5 left-5 z-10 w-[340px] max-w-2xl h-[calc(100vh-40px)] bg-white rounded-lg shadow-lg flex flex-col">
      {/*Header section */}
      <div className="flex-none border-b border-gray-100">
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="flex gap-4">
            <button className="text-black font-medium pb-2 border-b-2 border-pink-500">Node Library</button>
            <button className="text-gray-500 font-medium pb-2">Subflow Library</button>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:rounded-full hover:bg-gray-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 py-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search or ask anything..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex gap-2 px-5 pb-3 overflow-x-auto">
          <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap">Core Nodes</button>
          <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap">Integrations</button>
          <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap">Triggers</button>
          <button className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap">Custom Nodes</button>
        </div>
      </div>

      {/* Scrollable content section */}
      <div className="flex-1 overflow-y-auto min-h-0 bg-gray-50">
        {paletteNodes.map((category, index) => (
          <div key={index} className="p-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                    <span className="text-pink-500 text-xs font-semibold">{category.nodeIcon}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{category.category}</h3>
                      <span className="text-xs text-gray-500">{category.count}</span>
                    </div>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                </div>
                <div className="text-gray-400">›</div>
              </div>
              <div className="grid grid-cols-2 gap-2">
              {category.items.map((item) => (
                <button 
                  key={item.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, {
                    type: item.type,
                    label: item.label
                  })}
                  className="flex items-center gap-2 p-2.5 bg-white border border-gray-100 rounded-lg hover:border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-6 h-6 bg-pink-100 rounded-lg flex items-center justify-center">
                    {typeof item.icon === 'string' ? (
                      <span className="text-pink-500 text-xs">{item.icon}</span>
                    ) : (
                      item.icon
                    )}
                  </div>
                  <span className="text-sm text-gray-700 truncate">{item.label}</span>
                </button>
              ))}
              
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

 
};


export default NodePalette;