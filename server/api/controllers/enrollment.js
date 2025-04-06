import { db } from "../connect.js";

export const enroll = (req, res) => {
  const { studentId, classId } = req.body;
  const enrollmentDate = new Date();

  const q = "INSERT INTO enrolledStudents (studentId, classId, enrollmentDate) VALUES (?, ?, ?)";

  db.query(q, [studentId, classId, enrollmentDate], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ success: true, message: "Enrolled successfully!" });
  });
};
