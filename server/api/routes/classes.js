import express from "express";
import {launchClass, getClass} from "../controllers/class.js"; 

const router = express.Router();

router.post("/", launchClass); 
router.get("/tutor/:tutorId", getClass);

export default router;