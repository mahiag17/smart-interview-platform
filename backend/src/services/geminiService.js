

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const analyzeResume = async (resumeText, role) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Analyze this resume for a ${role} position.

Return ONLY valid JSON.
Do not use markdown.
Do not use code blocks.
Do not add explanations.

Format:

{
  "atsScore": 0,
  "missingSkills": [],
  "suggestions": []
}

Resume:
${resumeText}
`;

    const result = await model.generateContent(prompt);

    const responseText = result.response.text();

    console.log(responseText);

    const cleanedText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

module.exports = {
  analyzeResume,
};