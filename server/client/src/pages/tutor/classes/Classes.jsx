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
          style={{ backgroundColor: "#7e57c2" }} // Optional: Customize based on subject
          onClick={() => navigate(`/classes/${cls.classId}`)}
        >
          <h2>{capitalize(cls.subject)}</h2>
          <span className="code">Instructor: {cls.name}</span>
          <div className="info">
            <p>Start Date: {cls.startDate}</p>
            <p>End Date: {cls.endDate}</p>
            <p>Start Time: {cls.startTime}</p>
            <p>End Time: {cls.endTime}</p>
            <p>Frequency: {cls.frequency}</p>
            <p>Class Size: {cls.classSize}</p>
            <p>Lectures: {cls.numberOfLectures}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Classes;