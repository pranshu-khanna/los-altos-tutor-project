import express from "express";
import {launchClass} from "../controllers/classes.js"; 

const router = express.Router();

router.post("/", launchClass); 

export default router;