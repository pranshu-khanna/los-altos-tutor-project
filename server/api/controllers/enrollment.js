import { db } from "../connect.js";

export const enroll = (req, res) => {
  const { studentId, classId } = req.body;
  const enrollmentDate = new Date();

  const checkQ = `
    SELECT * FROM enrolledStudents 
    WHERE studentId = ? AND classId = ?
  `;

  db.query(checkQ, [studentId, classId], (checkErr, checkData) => {
    if (checkErr) return res.status(500).json(checkErr);

    if (checkData.length > 0) {
      return res.status(400).json({ success: false, message: "Already enrolled in this class." });
    }

    const insertQ = `
      INSERT INTO enrolledStudents (studentId, classId, enrollmentDate) 
      VALUES (?, ?, ?)
    `;

    db.query(insertQ, [studentId, classId, enrollmentDate], (insertErr, insertResult) => {
      if (insertErr) return res.status(500).json(insertErr);

      res.status(200).json({ success: true, message: "Enrolled successfully!" });
    });
  });
};
