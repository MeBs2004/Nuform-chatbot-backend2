import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
  visitorId: {
    type: String,
    required: true,
  },

  sender: {
    type: String,
    required: true,
    enum: ["user"],
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

const User = mongoose.model("User", userSchema);

export default User;