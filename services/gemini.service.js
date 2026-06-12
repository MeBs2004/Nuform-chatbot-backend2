import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const knowledge = fs.readFileSync(
  path.join(process.cwd(), "knowledge.txt"),
  "utf8"
);

export const askGemini = async (userMessage) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are Nuform Social AI Assistant.

KNOWLEDGE BASE:
${knowledge}

STRICT RULES:

1. Answer ONLY questions related to Nuform Social.
2. Use information from the knowledge base.
3. If the user asks anything unrelated to:
   - Nuform Social
   - Digital Marketing
   - SEO
   - Website Development
   - Branding
   - AI Automation
   - Nuform Academy

Respond EXACTLY with:

"I am a Nuform Social chatbot assistant. This question is not related to the services we provide. For any other query please contact +91 9902421936."

USER QUESTION:
${userMessage}
`;

    const result = await model.generateContent(prompt);

    return result.response.text();

  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I am currently unavailable.";
  }
};