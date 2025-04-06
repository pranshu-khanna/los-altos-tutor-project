import express from "express";
import {launchClass, getClass, searchClass} from "../controllers/class.js"; 

const router = express.Router();

router.post("/", launchClass); 
router.get("/tutor/:tutorId", getClass);
router.get("/search/:subject", searchClass); 

export default router;