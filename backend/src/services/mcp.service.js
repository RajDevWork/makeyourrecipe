const { Client } = require("@modelcontextprotocol/sdk/client/index.js");
const { StdioClientTransport } = require("@modelcontextprotocol/sdk/client/stdio.js");

let client = null;

const getMcpClient = async () => {
  if (client) return client;
console.log("Creating MCP Transport...");
  const transport = new StdioClientTransport({
    command: "npx",
    args: ["tsx", "./mcp/src/index.ts"]
  });
console.log("Creating MCP Client...");
  client = new Client({
    name: "recipe-client",
    version: "1.0.0"
  });


  await client.connect(transport);

  console.log("MCP Connected");

  return client;
};

module.exports = { getMcpClient };