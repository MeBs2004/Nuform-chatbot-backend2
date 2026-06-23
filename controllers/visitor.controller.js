import Visitor from "../models/visitor.model.js";


// ================= SAVE VISITOR =================
export const saveVisitor = async (req, res) => {

  try {

    const existingVisitor = await Visitor.findOne({
      visitorId: req.body.visitorId,
    });

    // Existing Visitor
    if (existingVisitor) {

      existingVisitor.lastVisit = new Date();

      existingVisitor.page = req.body.page;

      existingVisitor.status = "online";

      existingVisitor.totalVisits += 1;

      await existingVisitor.save();

      return res.status(200).json({
        success: true,
        message: "Visitor updated",
        visitor: existingVisitor,
      });

    }

    // New Visitor
    const visitor = await Visitor.create({

      ...req.body,

      status: "online",

      totalVisits: 1,

      totalMessages: 0,

    });

    return res.status(200).json({

      success: true,

      message: "New visitor created",

      visitor,

    });

  }

  catch (error) {

    console.error("Visitor Error:", error);

    return res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};


// ================= UPDATE EMAIL =================
export const saveEmail = async (req, res) => {

  try {

    const { visitorId, email } = req.body;

    if (!visitorId || !email) {

      return res.status(400).json({

        success: false,

        message: "visitorId and email are required",

      });

    }

    const visitor = await Visitor.findOneAndUpdate(

      { visitorId },

      {

        email,

      },

      {

        new: true,

      }

    );

    return res.status(200).json({

      success: true,

      message: "Email saved successfully",

      visitor,

    });

  }

  catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};


// ================= UPDATE NAME =================
export const updateVisitorName = async (req, res) => {

  try {

    const { visitorId, name } = req.body;

    const visitor = await Visitor.findOneAndUpdate(

      { visitorId },

      {

        name,

      },

      {

        new: true,

      }

    );

    return res.status(200).json({

      success: true,

      visitor,

    });

  }

  catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};