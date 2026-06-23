import Visitor from "../models/visitor.model.js";

export const saveVisitor = async (req, res) => {

  try {

    const visitor = await Visitor.create(req.body);

    res.status(200).json({
      success: true,
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