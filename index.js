import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import chatbotRoutes from "./routes/chatbot.route.js";
import suggestionRoutes from "./routes/suggestion.route.js";
import visitorRoutes from "./routes/visitor.route.js";

const app = express();

app.set("trust proxy", true);

dotenv.config();

const port = process.env.PORT || 4002;


// CORS
app.use((req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization"
  );

  res.header("Access-Control-Max-Age", "86400");

  if (req.method === "OPTIONS") {

    return res.sendStatus(200);

  }

  next();

});


// Middleware
app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)

.then(() => {

  console.log("Connected to MongoDB");

})

.catch((error) => {

  console.log("Error connecting to MongoDB:", error);

});


// Routes

// Chatbot
app.use("/bot/v1", chatbotRoutes);

// Suggestions
app.use("/bot/v1/suggestions", suggestionRoutes);

// Visitor Tracking
app.use("/bot/v1/visitor", visitorRoutes);


// Health Check
app.get("/", (req, res) => {

  res.send("Nuform Chatbot Backend Running 🚀");

});


// Start Server
app.listen(port, () => {

  console.log(`Server is Running on Port ${port}`);

});