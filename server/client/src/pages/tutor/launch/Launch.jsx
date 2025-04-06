import React, {useState, useContext} from "react";
import axios from "axios";
import {AuthContext} from "../../../context/authContext.js";
import {useNavigate} from "react-router-dom";
import "./launch.scss";

const subjectsList = [
    {value:"math",label:"Math"},
    {value:"english",label:"English"},
    {value:"spanish",label:"Spanish"},
    {value:"history",label:"History"},
    {value:"robotics",label:"Robotics"},
    {value:"science",label:"Science"},
    {value:"physics",label:"Physics"},
    {value:"art",label:"Art"},
    {value:"programming",label:"Programming"},
    {value:"literature",label:"Literature"},
    {value:"music",label:"Music"},
    {value:"business",label:"Business"},
    {value:"psychology",label:"Psychology"},
    {value:"geography",label:"Geography"},
    {value:"economics",label:"Economics"},
    {value:"health",label:"Health"},
    {value:"chemistry",label:"Chemistry"},
    {value:"biology",label:"Biology"},
    {value:"statistics",label:"Statistics"},
    {value:"philosophy",label:"Philosophy"},
    {value:"engineering",label:"Engineering"},
    {value:"design",label:"Design"},
    {value:"web-development",label:"Web Development"},
    {value:"data-science",label:"Data Science"},
    {value:"finance",label:"Finance"},
    {value:"marketing",label:"Marketing"},
    {value:"law",label:"Law"},
    {value:"environmental-science",label:"Environmental Science"},
    {value:"sociology",label:"Sociology"},
    {value:"astronomy",label:"Astronomy"},
    {value:"photonics",label:"Photonics"},
    {value:"nanotechnology",label:"Nanotechnology"},
    {value:"cryptography",label:"Cryptography"},
    {value:"game-design",label:"Game Design"},
    {value:"astrophysics",label:"Astrophysics"},
    {value:"linguistics",label:"Linguistics"},
    {value:"cybersecurity",label:"Cybersecurity"},
    {value:"animation",label:"Animation"},
    {value:"machine-learning",label:"Machine Learning"},
    {value:"genetics",label:"Genetics"},
    {value:"oceanography",label:"Oceanography"},
    {value:"archaeology",label:"Archaeology"},
    {value:"urban-planning",label:"Urban Planning"},
    {value:"ethics",label:"Ethics"},
    {value:"biotechnology",label:"Biotechnology"},
    {value:"quantum-computing",label:"Quantum Computing"},
    {value:"paleontology",label:"Paleontology"},
    {value:"sports-science",label:"Sports Science"},
    {value:"meteorology",label:"Meteorology"},
    {value:"other",label:"Other"},
  ];

const Launch = () => {
    const [formData, setFormData] = useState({
        subject: "",
        frequency: "",
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        classSize: "",
        numberOfLectures: ""
    });

  const [error, setError] = useState(null);
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
        subject,
        frequency,
        startDate,
        endDate,
        startTime,
        endTime,
        classSize,
        numberOfLectures
      } = formData;
      
      if (!subject || !frequency || !startDate || !endDate || !startTime || !endTime || !classSize || !numberOfLectures) {
        setError("Please fill out all fields.");
        return;
      }

    try {
        await axios.post("http://localhost:8800/api/classes", {
            tutorId: currentUser.id,
            frequency,
            startDate,
            endDate,
            startTime,
            endTime,
            classSize: parseInt(classSize),
            subject,
            numberOfLectures: parseInt(numberOfLectures)
        });
      navigate("/classes");
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to create class.");
    }
  };

  return (
    <div className="launch-class-page">
        <div className="form-container">
            <h2>Launch a New Class</h2>
            <form onSubmit={handleSubmit}>
                <label>Subject</label>
                <select name="subject" value={formData.subject} onChange={handleChange} required>
                <option value="">Select a subject</option>
                {subjectsList.map(subject => (
                    <option key={subject.value} value={subject.value}>{subject.label}</option>
                ))}
                </select>

                <label>Frequency</label>
                <select name="frequency" value={formData.frequency} onChange={handleChange} required>
                <option value="">Select frequency</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                </select>

                <label>Start Date</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />     

                <label>End Date</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />     

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
    </div>
  );
};

export default Launch;
