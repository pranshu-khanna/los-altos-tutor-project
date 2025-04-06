import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import axios from "axios";
import "./search.scss";

const subjects = [
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

const Search = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [results, setResults] = useState([]);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const handleEnroll = async (classId) => {
    try {
      await axios.post("http://localhost:8800/api/enroll", {
        studentId: currentUser.id,
        classId,
      });
      alert("Enrolled successfully!");
    } catch (err) {
      console.error("Enrollment failed:", err);
    }
  };

  const handleSearch = async () => {
    if (!selectedSubject) return;
    try {
      const res = await axios.get(`http://localhost:8800/api/classes/search/${selectedSubject}`);
      setResults(res.data);
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };

  return (
    <div className="search-page">
      <div className="search-form">
        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
          <option value="">Select a subject</option>
          {subjects.map((subject, idx) => (
            <option value={subject.value} key={idx}>{subject.label}</option>
          ))}
        </select>
        <button onClick={handleSearch}>Choose</button>
      </div>

      <div className="results">
        {results.map((cls) => (
          <div className="card" key={cls.classId}>
            <h2>{cls.subject}</h2>
            <p>Instructor: {cls.name}</p>
            <p>Start Date: {cls.startDate}</p>
            <p>Frequency: {cls.frequency}</p>
            <p>Class Size: {cls.classSize}</p>
            <button
              onClick={() => handleEnroll(cls.classId)}
              disabled={enrolledClasses.includes(cls.classId)}
            >
              {enrolledClasses.includes(cls.classId) ? "Enrolled" : "Enroll"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;