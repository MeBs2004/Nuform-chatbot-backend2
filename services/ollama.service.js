import axios from "axios";
import fs from "fs";
import path from "path";

const knowledge = fs.readFileSync(
  path.join(process.cwd(), "knowledge.txt"),
  "utf8"
);

export const askOllama = async (userMessage) => {
  try {
    const prompt = `
You are Nuform Social AI Assistant.

Knowledge Base:
${knowledge}

Rules:
1. Answer ONLY using the knowledge provided above.
2. If the question is related to Nuform Social, answer professionally.
3. If the question is NOT related to Nuform Social, reply EXACTLY:

"I am a Nuform Social chatbot assistant. This question is not related to the services we provide. For any other query please contact +91 9902421936."

User Question:
${userMessage}
`;

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3",
        prompt,
        stream: false
      }
    );

    return response.data.response;

  } catch (error) {
    console.error("Ollama Error:", error);
    return "Sorry, I am currently unavailable.";
  }
};