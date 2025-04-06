import React, {useState, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/authContext.js";
import {useNavigate} from "react-router-dom";
import "./launch.scss";

const subjectsList = [
  "Math", "Science", "English", "History",
  "Computer Science", "Art", "Music", "Economics",
  "Physics", "Chemistry", "Biology", "Geography"
];

const Launch = () => {
  const [formData, setFormData] = useState({
    subject: "",
    frequency: "",
    startTime: "",
    endTime: "",
    classSize: "",
    numberOfLectures: ""
  });

  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { subject, frequency, startTime, endTime, classSize, numberOfLectures } = formData;

    if (!subject || !frequency || !startTime || !endTime || !classSize || !numberOfLectures) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8800/api/classes", {
        tutorId: currentUser.id,
        subject,
        frequency,
        startTime,
        endTime,
        classSize: parseInt(classSize),
        numberOfLectures: parseInt(numberOfLectures),
      });

      navigate("/classes");
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to create class.");
    }
  };

  return (
    <div className="launch-class-page">
      <h2>Launch a New Class</h2>
      <form onSubmit={handleSubmit}>
        <label>Subject</label>
        <select name="subject" value={formData.subject} onChange={handleChange} required>
          <option value="">Select a subject</option>
          {subjectsList.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>

        <label>Frequency</label>
        <select name="frequency" value={formData.frequency} onChange={handleChange} required>
          <option value="">Select frequency</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        <label>Start Time</label>
        <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />

        <label>End Time</label>
        <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />

        <label>Class Size</label>
        <input type="number" name="classSize" min="1" value={formData.classSize} onChange={handleChange} required />

        <label>Number of Lectures</label>
        <input type="number" name="numberOfLectures" min="1" value={formData.numberOfLectures} onChange={handleChange} required />

        {error && <p className="error">{error}</p>}

        <button type="submit">Create Class</button>
      </form>
    </div>
  );
};

export default Launch;
