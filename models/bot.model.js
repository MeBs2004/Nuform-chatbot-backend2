import mongoose from "mongoose";

const botSchema = new mongoose.Schema(
{
  visitorId: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
},
{
  timestamps: true,
}
);

const Bot = mongoose.model("Bot", botSchema);

export default Bot;