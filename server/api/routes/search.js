import express from "express";
import {displayClassesBySubject} from "../controllers/search.js";

const router = express.Router();
router.get("/search/:subject", displayClassesBySubject);

export default router;