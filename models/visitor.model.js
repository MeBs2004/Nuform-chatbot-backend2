import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
{
  visitorId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  // Geo Location
  ip: String,
  country: String,
  region: String,
  city: String,
  timezone: String,
  isp: String,

  lat: {
    type: Number,
    default: 0,
  },

  lon: {
    type: Number,
    default: 0,
  },

  // Device Information
  browser: String,
  os: String,
  device: String,
  language: String,
  page: String,

  // Lead Information
  name: {
    type: String,
    default: "",
    trim: true,
  },

  email: {
    type: String,
    default: "",
    trim: true,
    lowercase: true,
  },

  // Analytics
  totalVisits: {
    type: Number,
    default: 1,
  },

  totalMessages: {
    type: Number,
    default: 0,
  },

  lastMessage: {
    type: String,
    default: "",
  },

  status: {
    type: String,
    enum: ["online", "offline"],
    default: "online",
  },

  // Dates
  firstVisit: {
    type: Date,
    default: Date.now,
  },

  lastVisit: {
    type: Date,
    default: Date.now,
  },

},
{
  timestamps: true,
}
);

export default mongoose.model(
  "Visitor",
  visitorSchema
);