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

        Choose the SINGLE BEST recipe based on:

        1. Views (popularity)
        2. Likes (engagement)
        3. Saves (strongest user interest signal)
        4. Cooking time
        5. Difficulty
        6. Overall appeal

        Rules:
        - Prefer recipes with higher saves and likes over views alone.
        - recommendationScore should represent recommendation confidence.
        - reason must be concise (maximum 25-30 words).
        - Return ONLY valid JSON.
        - Do not include markdown.
        - Do not include any text outside JSON.

        Return this exact structure:

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

       if (recommendation?.recommendedRecipe) {
        recommendation.recommendedRecipe.recommendationScore =
            Math.max(
            80,
            recommendation.recommendedRecipe.recommendationScore || 0
            );
        }

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