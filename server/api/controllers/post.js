import { db } from "../connect.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
export const upload = multer({ storage });

export const getPosts = (req, res) => {
  const q = "SELECT * FROM posts WHERE classId = ?";
  db.query(q, [req.params.classId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const createPost = (req, res) => {
  const {classId, content, dueDate} = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const q = `
    INSERT INTO posts (classId, content, imageUrl, dueDate)
    VALUES (?, ?, ?, ?)
  `;
  const values = [classId, content, imageUrl, dueDate];

  db.query(q, values, (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(201).json({ success: true, postId: result.insertId });
  });
};
