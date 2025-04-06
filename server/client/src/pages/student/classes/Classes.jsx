import "./classes.scss";
import React from "react";

const dummyClasses = [
  {
    id: 1,
    title: "Algebra 1",
    description: "Period 1 · Room 203",
    teacher: "Mr. Smith",
    color: "#a29bfe",
  },
  {
    id: 2,
    title: "World History",
    description: "Period 3 · Room 110",
    teacher: "Ms. Johnson",
    color: "#74b9ff",
  },
  {
    id: 3,
    title: "Biology",
    description: "Period 5 · Lab 4",
    teacher: "Dr. Nguyen",
    color: "#55efc4",
  },
  {
    id: 4,
    title: "Creative Writing",
    description: "Period 6 · Room 301",
    teacher: "Mrs. Lee",
    color: "#fab1a0",
  },
];

const Classes = () => {
  return (
    <div className="classes">
      <h1>My Classes</h1>
      <div className="class-grid">
        {dummyClasses.map((cls) => (
          <div className="class-card" key={cls.id} style={{ backgroundColor: cls.color }}>
            <div className="class-header">
              <h2>{cls.title}</h2>
              <p>{cls.description}</p>
            </div>
            <div className="class-footer">
              <span>Instructor: {cls.teacher}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;