export const nodeHandlers = {
    askAI: (node) => {
      console.log(`Executing AskAI Node: ${node.id}`);
      return {
        output: `AI Response: ${node.data.prompt}`,
        nodeId: node.id,
        type: node.type,
        data: node.data,
      };
    },
    extractData: (node) => {
      console.log(`Executing ExtractData Node: ${node.id}`);
      return {
        output: `Extracted Data: ${node.data.source}`,
        nodeId: node.id,
        type: node.type,
        data: node.data,
      };
    },
    summarizer: (node) => {
      console.log(`Executing Summarizer Node: ${node.id}`);
      return {
        output: `Summary: ${node.data.content.substring(0, 50)}...`,
        nodeId: node.id,
        type: node.type,
        data: node.data,
      };
    },
    categorizer: (node) => {
      console.log(`Executing Categorizer Node: ${node.id}`);
      return {
        output: `Categorized as: ${node.data.category}`,
        nodeId: node.id,
        type: node.type,
        data: node.data,
      };
    },
    analyzer: (node) => {
      console.log(`Executing Analyzer Node: ${node.id}`);
      return {
        output: `Analysis Result: ${node.data.input}`,
        nodeId: node.id,
        type: node.type,
        data: node.data,
      };
    },
  };