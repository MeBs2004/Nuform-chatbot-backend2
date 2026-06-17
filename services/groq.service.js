import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";
import fs from "fs";
import path from "path";

// ==========================================
// LOAD KNOWLEDGE BASE
// ==========================================

const knowledgePath = path.join(process.cwd(), "knowledge.txt");

let knowledge = "";

try {

  knowledge = fs.readFileSync(
    knowledgePath,
    "utf8"
  );

  console.log("knowledge.txt loaded successfully");

} catch (error) {

  console.log(
    "Error loading knowledge.txt:",
    error.message
  );
}

// ==========================================
// MULTIPLE API KEYS
// ==========================================

const apiKeys = [

  process.env.GROQ_API_KEY_1,
  process.env.GROQ_API_KEY_2,
  process.env.GROQ_API_KEY_3,
  process.env.GROQ_API_KEY_4,

].filter(Boolean);

// ==========================================
// FUNCTION
// ==========================================

export const askGroq = async (
  userMessage,
  language = "English"
) => {

  // Try all keys one by one
  for (const key of apiKeys) {

    try {

      const groq = new Groq({
        apiKey: key,
      });

      const completion =
        await groq.chat.completions.create({

          model: "llama-3.1-8b-instant",

          temperature: 0.3,

          max_tokens: 500,

          messages: [

            {
              role: "system",

              content: `

You are the official AI assistant of Nuform Social Pvt. Ltd.

IMPORTANT:
Only answer questions related to:
- Nuform Social
- Digital Marketing
- SEO
- Websites
- Branding
- Mobile Apps
- Performance Marketing
- Social Media
- Business Growth

If user asks unrelated questions reply EXACTLY:

⚠️ I am the Nuform Social AI Assistant and can only help with business, marketing, branding, websites, SEO, apps, and digital growth related questions.

Company Knowledge:

${knowledge}

Response Style:
- Professional
- Modern
- Human-like
- Short paragraphs
- Bullet points
- Clean formatting

Reply language:
${language}

`
            },

            {
              role: "user",
              content: userMessage
            }

          ]

        });

      return completion.choices[0].message.content;

    } catch (error) {

      console.log("Groq Key Failed... Trying Next Key");

      // Try next key automatically
      continue;
    }
  }

  // If all keys fail
  return "⚠️ Assistant is temporarily unavailable. Please try again later.";
};