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
  pdfGenerator: (node, previousOutput) => {
    console.log(`Executing PDFGeneration Node: ${node.id}`);
    console.log(`Received input:`, previousOutput);
    
    const contentToUse = previousOutput || node.data.content || "No content provided";
    
    return {
      output: `PDF Generated with content: ${contentToUse}`,
      nodeId: node.id,
      type: node.type,
      data: node.data,
    };
  },
  // Update other handlers similarly
};