import express from "express";

import {
  saveVisitor,
  saveEmail,
  updateVisitorName,
} from "../controllers/visitor.controller.js";

const router = express.Router();


// Save Visitor
router.post("/", saveVisitor);


// Save Email
router.post("/email", saveEmail);


// Save Name
router.post("/name", updateVisitorName);


export default router;