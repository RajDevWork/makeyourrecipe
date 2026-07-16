const { Client } = require("@modelcontextprotocol/sdk/client/index.js");
const { StdioClientTransport } = require("@modelcontextprotocol/sdk/client/stdio.js");

let client = null;


/**
 * Returns a singleton MCP client instance.
 *
 * If an MCP client has already been created, the existing instance is
 * returned. Otherwise, a new MCP transport and client are initialized,
 * connected, and stored for future reuse.
 *
 * Workflow:
 * 1. Return the existing client if already initialized.
 * 2. Create a new stdio transport for the MCP server.
 * 3. Initialize the MCP client with its name and version.
 * 4. Connect the client to the transport.
 * 5. Cache and return the connected client instance.
 *
 * @async
 * @function getMcpClient
 * @returns {Promise<Client>} A connected singleton MCP client instance.
 */
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