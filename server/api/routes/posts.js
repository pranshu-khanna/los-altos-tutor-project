import express from "express";
import {createPost, getPosts} from "../controllers/post.js";

const router = express.Router();

router.post("/", createPost);
router.get("/class/:classId", getPosts);

export default router;