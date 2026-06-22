import Bot from "../models/bot.model.js";
import User from "../models/user.model.js";
import { askGroq } from "../services/groq.service.js";
import { needsHumanHandoff } from "../services/handoff.service.js";

export const Message = async (req, res) => {

  try {

    const { text, language } = req.body;

    // Check empty input
    if (!text?.trim()) {

      return res.status(400).json({
        success: false,
        error: "Text cannot be empty",
      });

    }

    // Human handoff
    if (needsHumanHandoff(text)) {

      return res.status(200).json({
        success: true,
        botMessage: `
Sure! Our team will be happy to assist you.

📞 Call: +91-9902421936

💬 WhatsApp:
https://wa.me/919902421936

📧 Email:
info@nuformsocial.com
        `,
      });

    }

    // Save user message
    const user = await User.create({
      sender: "user",
      text,
    });

    // Get AI response
    const botResponse = await askGroq(text, language);

    // Save bot message
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