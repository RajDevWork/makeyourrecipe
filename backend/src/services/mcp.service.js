const { Client } = require("@modelcontextprotocol/sdk/client/index.js")
const { StdioClientTransport } = require("@modelcontextprotocol/sdk/client/stdio.js");

let client = new Client;

const getMcpClient = async ()=>{

    //create transporter
    const transport = new StdioClientTransport({
        command:'npx',
        args:['tsx','./mcp/src/index.ts']
    });

    //create client to connect mcp
    client = new Client({
        name:'tiny-cats-client',
        version:'1.0.0'
    });

    //connect client
    await client.connect(transport);

    return client;


}

module.exports = {
    getMcpClient
}