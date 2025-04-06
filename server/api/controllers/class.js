import {db} from "../connect.js";

export const launchClass = (req, res) => {
    const {
      tutorId,
      frequency,
      startDate,
      endDate,
      startTime,
      endTime,
      classSize,
      subject,
      numberOfLectures,
    } = req.body;
  
    console.log("REQ BODY:", req.body);
  
    const q = `
      INSERT INTO classesOffered 
      (tutorId, frequency, startDate, endDate, startTime, endTime, classSize, subject, numberOfLectures)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    db.query(q, [
      tutorId,
      frequency,
      startDate,
      endDate,
      startTime,
      endTime,
      classSize,
      subject,
      numberOfLectures
    ], (err, data) => {
      if (err) {
        console.error("SQL ERROR:", err); // 👈 Add this
        return res.status(500).json(err);
      }
      return res.status(200).json("Class launched successfully.");
    });
};

export const getClass = (req, res) => {
  const tutorId = req.params.tutorId;
  const q = ` SELECT c.*, u.name FROM classesOffered AS c 
              JOIN users AS u ON c.tutorId = u.id
              WHERE c.tutorId = ?`;

  db.query(q, [tutorId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};