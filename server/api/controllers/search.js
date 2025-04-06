import {db} from "../connect.js";

export const displayClassesBySubject = (req, res) => {
  const subject = req.params.subject;

  const q = `
    SELECT c.*, u.name 
    FROM classesOffered c
    JOIN users u ON c.tutorId = u.id
    WHERE FIND_IN_SET(?, u.tutorSubjects)
  `;

  db.query(q, [subject], (err, data) => {
    if (err) {
      console.error("Search query failed:", err);
      return res.status(500).json(err);
    }
    res.status(200).json(data);
  });
};
