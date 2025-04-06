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
        if (err) return res.status(500).json(err);
        return res.status(200).json("Class launched successfully.");
      });
};
