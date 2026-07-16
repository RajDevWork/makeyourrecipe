/**
 * Generates an AI-generated response using the Google Gemini API.
 *
 * This function:
 * 1. Dynamically imports the Google GenAI SDK.
 * 2. Initializes the Gemini client using the API key from environment variables.
 * 3. Sends the provided prompt to the Gemini 2.5 Flash model.
 * 4. Returns the generated text response.
 *
 * @async
 * @function generateAiResponse
 * @param {string} prompt - The input prompt to send to the Gemini model.
 * @returns {Promise<string>} The AI-generated text response.
 * @throws {Error} Throws an error if the Gemini API request or client initialization fails.
 */
async function generateAiResponse(prompt) {
  const { GoogleGenAI } = await import("@google/genai");

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}

module.exports = {
    generateAiResponse
}