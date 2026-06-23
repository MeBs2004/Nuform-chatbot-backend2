import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
{
  ip: String,
  country: String,
  region: String,
  city: String,
  timezone: String,
  browser: String,
  os: String,
  device: String,
  language: String,
  page: String,

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