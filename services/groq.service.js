import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";
import fs from "fs";
import path from "path";

const groq = new Groq({
apiKey: process.env.GROQ_API_KEY,
});

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

export const askGroq = async (
userMessage,
language = "English"
) => {

try {

const completion =
  await groq.chat.completions.create({

    model: "llama-3.3-70b-versatile",

    temperature: 0.2,

    max_tokens: 700,

    messages: [

      {
        role: "system",

        content: `

You are the official AI assistant of Nuform Social Pvt. Ltd.

IMPORTANT:

You must STRICTLY follow the knowledge base below.

================ KNOWLEDGE BASE ================

${knowledge}

================ END KNOWLEDGE BASE ================

STRICT BEHAVIOR RULES:

ONLY answer questions related to:
Nuform Social
Digital Marketing
SEO
Website Development
Branding
Social Media
Performance Marketing
Mobile Apps
Corporate AV
Influencer Marketing
Business Growth
Technology Services
NEVER answer unrelated questions.
If user asks unrelated question reply EXACTLY:

⚠️ I am the Nuform Social AI Assistant and can only help with questions related to our services, digital marketing, websites, branding, SEO, applications, and business growth solutions.

📞 Contact:
+91 9902421936

🌐 Website:
www.nuformsocial.com

Your response style MUST be:
modern
professional
premium
human-like
visually clean
Use:
emojis professionally
bullet points
spacing
short paragraphs
NEVER sound robotic.
NEVER mention AI model names.
NEVER say:
"According to provided knowledge base"
ALWAYS behave like a premium business assistant similar to:
Zoho
Intercom
Tawk.to

ALWAYS reply in this language:
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

console.error("Groq Error:", error);

return "⚠️ Sorry, the assistant is currently unavailable.";

}
};