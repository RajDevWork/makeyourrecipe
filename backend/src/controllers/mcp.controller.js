const { getMcpClient } = require("../services/mcp.service");
const { generateAiResponse } = require("../services/gemini.service");

const MCPAiRecommendation = async (req, res) => {
  try {
    const client = await getMcpClient();
    const { difficulty } = req.body;

    console.log("Calling MCP Tool...");

    const result = await client.callTool({
      name: "recommend_recipe",
      arguments: {
        difficulty,
      },
    });

    const response = result.content[0].text;

    const recipes = JSON.parse(response);

    const prompt = `
    You are an expert recipe recommendation engine.

    Recipes:
    ${JSON.stringify(recipes.recommendations, null, 2)}

    Choose the BEST recipe based on:
    1. Views
    2. Likes
    3. Saves
    4. Cooking time
    5. Overall appeal

    Return ONLY valid JSON.

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

    try {
      const aiResult = await generateAiResponse(prompt);

      const cleanResponse = aiResult
        .replace(/```json\s*/gi, "")
        .replace(/```\s*/g, "")
        .trim();

      const recommendation = JSON.parse(cleanResponse);

      return res.json({
        success: true,
        source: "gemini",
        isAiGenerated: true,
        recommendation,
      });

    } catch (geminiError) {
    //   console.error("Gemini Error:", geminiError.message);
       console.error("AI recommendation fallback activated" );
      // Fallback Recipe
      const fallbackRecipe = recipes.recommendations?.[0];

      return res.json({
        success: true,
        isAiGenerated: false,
        source: "fallback",
        recommendation: {
          recommendedRecipe: {
            _id: fallbackRecipe._id,
            title: fallbackRecipe.title,
            description: fallbackRecipe.description,
            difficulty: fallbackRecipe.difficulty,
            stats: fallbackRecipe.stats,
            reason:
              "This recipe is currently trending in our community based on popularity and engagement.",
            recommendationScore: 85,
          },
        },
      });
    }

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  MCPAiRecommendation,
};