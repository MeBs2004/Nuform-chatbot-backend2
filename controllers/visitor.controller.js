import Visitor from "../models/visitor.model.js";
import axios from "axios";


// ================= SAVE VISITOR =================
export const saveVisitor = async (req, res) => {

  try {

    // Get Client IP
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket.remoteAddress;

    let geoData = {};

    try {

      const response = await axios.get(
        `http://ip-api.com/json/${ip}`
      );

      geoData = {

        ip,

        country: response.data.country,

        region: response.data.regionName,

        city: response.data.city,

        timezone: response.data.timezone,

        isp: response.data.isp,

        lat: response.data.lat,

        lon: response.data.lon,

      };

    }

    catch (error) {

      console.log("Geo IP lookup failed");

    }


    const existingVisitor = await Visitor.findOne({
      visitorId: req.body.visitorId,
    });

    // Existing Visitor
    if (existingVisitor) {

      existingVisitor.lastVisit = new Date();

      existingVisitor.page = req.body.page;

      existingVisitor.status = "online";

      existingVisitor.totalVisits += 1;

      // Update Geo Data
      existingVisitor.ip = geoData.ip;

      existingVisitor.country = geoData.country;

      existingVisitor.region = geoData.region;

      existingVisitor.city = geoData.city;

      existingVisitor.timezone = geoData.timezone;

      existingVisitor.isp = geoData.isp;

      existingVisitor.lat = geoData.lat;

      existingVisitor.lon = geoData.lon;

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

      ...geoData,

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