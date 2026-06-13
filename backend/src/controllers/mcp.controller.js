const { getMcpClient } = require( "../services/mcp.service")
const { generateAiResponse } = require( "../services/gemini.service");

const MCPAiRecommendation = async(req,res)=>{
        const client = await getMcpClient()
        const {difficulty} = req.body;

        // console.log("client = ",client)
        //this is await operation.
        // const tools = await client.listTools();


        //result chaiye
        const result = await client.callTool({
            name:"recommend_recipe",
            arguments:{
                difficulty:difficulty
            }
        })

        //respons

        let response = (result.content)[0].text

        const recipes = JSON.parse(response);

        //generating AI recommendation from data
        const prompt = `
        You are a food recommendation engine.

        Recipes:
        ${JSON.stringify(recipes, null, 2)}

        Choose the best recipe.

        Return ONLY JSON:

        {
        "recommendedRecipe": {
            "_id": "",
            "title": "",
            "description": "",
            "difficulty": "",
            "stats": {
            "views": 0,
            "likes": 0,
            "saves": 0
            },
            "reason": "",
            "recommendationScore": 0
        }
        }
        `;

        const AiResult = await generateAiResponse(prompt)

        try {
        const recommendation = JSON.parse(AiResult);

        return res.json({
            success: true,
            recommendation
        });

        } catch (err) {

        const cleanResponse = AiResult
            .replace(/```json\s*/gi, "")
            .replace(/```\s*/g, "")
            .trim();

        const recommendation = JSON.parse(cleanResponse);

        return res.json({
            success: true,
            recommendation
        });
        }
}
module.exports = {
    MCPAiRecommendation
}