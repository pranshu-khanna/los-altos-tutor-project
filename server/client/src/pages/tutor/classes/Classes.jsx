import "./classes.scss";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Classes = () => {
  const { currentUser } = useContext(AuthContext);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/classes/tutor/${currentUser.id}`);
        setClasses(res.data);
      } catch (err) {
        console.error("Failed to fetch classes:", err);
      }
    };
    fetchClasses();
  }, [currentUser.id]);

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  return (
    <div className="classes">
      {classes.map((cls) => (
        <div
          className="card"
          key={cls.classId}
          style={{ backgroundColor: "#7e57c2", cursor: "pointer" }}
          onClick={() => navigate(`/classes/${cls.classId}`)}
        >
          <h2>{capitalize(cls.subject)}</h2>
          <span className="code">
            Instructor: {cls.name ? cls.name : "Unknown"}
          </span>
          <div className="info">
            <p><strong>Start Date:</strong> {cls.startDate || "TBD"}</p>
            <p><strong>End Date:</strong> {cls.endDate || "TBD"}</p>
            <p><strong>Start Time:</strong> {cls.startTime || "TBD"}</p>
            <p><strong>End Time:</strong> {cls.endTime || "TBD"}</p>
            <p><strong>Frequency:</strong> {capitalize(cls.frequency)}</p>
            <p><strong>Class Size:</strong> {cls.classSize}</p>
            <p><strong>Lectures:</strong> {cls.numberOfLectures}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Classes;