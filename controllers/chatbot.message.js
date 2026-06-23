import Bot from "../models/bot.model.js";
import User from "../models/user.model.js";
import Visitor from "../models/visitor.model.js";

import { askGroq } from "../services/groq.service.js";
import { needsHumanHandoff } from "../services/handoff.service.js";

export const Message = async (req, res) => {

  try {

    const { text, language, visitorId } = req.body;

    // Empty input check
    if (!text?.trim()) {

      return res.status(400).json({
        success: false,
        error: "Text cannot be empty",
      });

    }

    // Update Visitor Information
    if (visitorId) {

      await Visitor.findOneAndUpdate(

        { visitorId },

        {
          $inc: {
            totalMessages: 1,
          },

          $set: {
            lastVisit: new Date(),
            lastMessage: text,
            status: "online",
          },

        }

      );

    }

    // Human Handoff
    if (needsHumanHandoff(text)) {

      // Save user message
      await User.create({
        visitorId,
        sender: "user",
        text,
      });

      // Save bot message
      await Bot.create({
        visitorId,
        text: `
Sure! Our team will be happy to assist you.

📞 Call: +91-9902421936

💬 WhatsApp:
https://wa.me/919902421936

📧 Email:
info@nuformsocial.com
        `,
      });

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

    // Save User Message
    const user = await User.create({

      visitorId,

      sender: "user",

      text,

    });

    // AI Response
    const botResponse = await askGroq(
      text,
      language
    );

    // Save Bot Message
    const bot = await Bot.create({

      visitorId,

      text: botResponse,

    });

    return res.status(200).json({

      success: true,

      userMessage: user.text,

      botMessage: bot.text,

    });

  }

  catch (error) {

    console.error(
      "Error in Message Controller:",
      error
    );

    return res.status(500).json({

      success: false,

      error: "Internal Server Error",

    });

  }

};