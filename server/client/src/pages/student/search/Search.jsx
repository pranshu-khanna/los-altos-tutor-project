import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import axios from "axios";
import "./search.scss";

const Search = () => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [results, setResults] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!currentUser?.studentSubjects?.length) return;
      try {
        const suggestions = await Promise.all(
          currentUser.studentSubjects.map((subject) =>
            axios.get(`http://localhost:8800/api/classes/search/${subject}`)
          )
        );
        const merged = suggestions.flatMap((res) => res.data);
        setSuggested(merged);
      } catch (err) {
        console.error("Failed to load suggested classes:", err);
      }
    };

    fetchSuggestions();
  }, [currentUser]);

  const handleEnroll = async (classId) => {
    try {
      await axios.post("http://localhost:8800/api/enroll", {
        studentId: currentUser.id,
        classId,
      });
      alert("Enrolled successfully!");
      setEnrolledClasses((prev) => [...prev, classId]);
    } catch (err) {
      console.error("Enrollment failed:", err);
    }
  };

  const handleSearch = async () => {
    if (!selectedSubject) return;
    try {
      const res = await axios.get(
        `http://localhost:8800/api/classes/search/${selectedSubject}`
      );
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
          {currentUser.studentSubjects?.map((subj, i) => (
            <option value={subj} key={i}>
              {subj[0].toUpperCase() + subj.slice(1)}
            </option>
          ))}
        </select>
        <button onClick={handleSearch}>Choose</button>
      </div>

      {suggested.length > 0 && (
        <div className="suggested-section">
          <h2>Suggested for You</h2>
          {suggested.map((cls) => (
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
      )}

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