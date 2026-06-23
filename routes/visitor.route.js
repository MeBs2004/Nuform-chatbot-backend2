import express from "express";

import {
  saveVisitor,
} from "../controllers/visitor.controller.js";

const router = express.Router();

router.post("/", saveVisitor);

export default router;