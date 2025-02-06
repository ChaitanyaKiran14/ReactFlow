const ExtractDataNode = ({ data }) => {
    return (
      <div className="extract-data-node">
        <Handle type="target" position="top" />
        <div className="node-header">
          <div className="icon-container">
            <div className="data-icon">📊</div>
          </div>
          <div className="header-content">
            <div className="header-title">Data Processing</div>
            <div className="header-subtitle">Extract Data</div>
          </div>
        </div>
        <div className="node-content">
          <div className="input-section">
            <label>Extraction Pattern</label>
            <input 
              type="text" 
              placeholder="Enter extraction pattern"
              value={data.pattern || ''}
              onChange={(e) => data.onChange?.('pattern', e.target.value)}
            />
          </div>
          <div className="input-section">
            <label>Data Format</label>
            <select 
              value={data.format || 'json'}
              onChange={(e) => data.onChange?.('format', e.target.value)}
            >
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              <option value="text">Plain Text</option>
            </select>
          </div>
        </div>
        <Handle type="source" position="bottom" />
      </div>
    );
  };
  
  export default ExtractDataNode;
  