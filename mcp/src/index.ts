import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { recommendRecipeTool } from "./tools/recommendRecipe.tool.ts";


// Create server instance
const server = new McpServer({
  name: "recipe-book",
  version: "1.0.0",
});

server.registerTool(
  "recommend_recipe",
  {
    title: "recommend_recipe",
    description: "Recommend best recipe according to inputs",
    inputSchema: {
      difficulty: z.string()
    }
  },
  async ({ difficulty }) => {
    const result = await recommendRecipeTool(difficulty);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result)
        }
      ]
    };
  }
);

//Create Transport
const transporter = new StdioServerTransport()

await server.connect(transporter)

console.log("Recommend recipe is running....")