import Bot from "../models/bot.model.js";
import User from "../models/user.model.js";
import { askGroq } from "../services/groq.service.js";

export const Message = async (req, res) => {

  try {
    const { text, language } = req.body;

    if (!text?.trim()) {

      return res.status(400).json({
        error: "Text cannot be empty",
      });
    }

    // Save User Message
    const user = await User.create({
      sender: "user",
      text,
    });

    // Get AI Response
    const botResponse = await askGroq(text, language);

    // Save Bot Message
    const bot = await Bot.create({
      text: botResponse,
    });
    return res.status(200).json({
      success: true,
      userMessage: user.text,
      botMessage: bot.text,
    });

  } catch (error) {

    console.error("Error in Message Controller:", error);

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
