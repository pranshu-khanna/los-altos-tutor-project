import express from "express";
import {launchClass} from "../controllers/class.js"; 

const router = express.Router();

router.post("/", launchClass); 

export default router;