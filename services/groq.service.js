import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";
import fs from "fs";
import path from "path";

console.log(
  "GROQ KEY LOADED:",
  process.env.GROQ_API_KEY
    ? process.env.GROQ_API_KEY.slice(0, 10)
    : "NOT FOUND"
);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const knowledgePath = path.join(process.cwd(), "knowledge.txt");

let knowledge = "";

try {
  knowledge = fs.readFileSync(knowledgePath, "utf8");
  console.log("knowledge.txt loaded successfully");
} catch (error) {
  console.log("Error loading knowledge.txt:", error.message);
}

export const askGroq = async (userMessage, language = "English") => {
  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: `
You are Nuform Social AI Assistant.

KNOWLEDGE BASE:
${knowledge}

STRICT RULES:

1. Answer ONLY questions related to:
- Nuform Social
- Nuform Academy
- Digital Marketing
- SEO
- Website Development
- Branding
- AI Automation
- Social Media Marketing
- Performance Marketing

2. Use the knowledge base to answer.

3. If the question is unrelated to Nuform Social services, respond EXACTLY:

"I am a Nuform Social chatbot assistant. This question is not related to the services we provide. For any other query please contact +91 9902421936."

4. Keep answers professional and concise.

5. Reply ONLY in this language:
${language}
`,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],

      temperature: 0.3,
      max_tokens: 500,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Groq Error:", error);
    return "Sorry, I am currently unavailable.";
  }
};