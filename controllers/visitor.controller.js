import Visitor from "../models/visitor.model.js";

export const saveVisitor = async (req, res) => {

  try {

    const existingVisitor = await Visitor.findOne({

      visitorId: req.body.visitorId,

    });

    // Existing visitor
    if (existingVisitor) {

      existingVisitor.lastVisit = new Date();

      existingVisitor.page = req.body.page;

      await existingVisitor.save();

      return res.status(200).json({

        success: true,

        message: "Visitor updated",

        visitor: existingVisitor,

      });

    }

    // New visitor
    const visitor = await Visitor.create(req.body);

    res.status(200).json({

      success: true,

      message: "New visitor created",

      visitor,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      error: error.message,

    });

  }

};