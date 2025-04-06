import React, { useState, useEffect, useRef } from "react";
import "./calendar.scss";

const assignments = [
  {
    id: 1,
    date: "2025-04-10",
    class: "Math",
    title: "Algebra Homework",
    description: "Complete questions 1–10 on page 42."
  },
  {
    id: 2,
    date: "2025-04-12",
    class: "History",
    title: "Civil War Essay",
    description: "Write a 500-word essay on the causes of the Civil War."
  },
  {
    id: 3,
    date: "2025-04-18",
    class: "English",
    title: "Poetry Reading",
    description: "Read chapters 5–7 of 'Leaves of Grass'."
  }
];

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [hoveredAssignment, setHoveredAssignment] = useState(null);
  const tooltipRef = useRef();

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay();

    const daysArray = [];

    for (let i = 0; i < firstDay; i++) {
      daysArray.push(<div className="day empty" key={`empty-${i}`} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const fullDate = new Date(year, month, day).toISOString().split("T")[0];
      const dayAssignments = assignments.filter(a => a.date === fullDate);

      daysArray.push(
        <button
          className={`day ${selectedDate === fullDate ? "selected" : ""}`}
          key={day}
          onClick={() => setSelectedDate(fullDate)}
        >
          <div className="day-number">{day}</div>
          {dayAssignments.map((assignment) => (
            <div
              className="assignment"
              key={assignment.id}
              onMouseEnter={(e) =>
                setHoveredAssignment({
                  ...assignment,
                  x: e.clientX,
                  y: e.clientY
                })
              }
              onMouseLeave={() => setHoveredAssignment(null)}
            >
              {assignment.title}
            </div>
          ))}
        </button>
      );
    }

    return daysArray;
  };

  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    setCurrentDate(new Date(prevMonth));
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    setCurrentDate(new Date(nextMonth));
  };

  useEffect(() => {
    if (hoveredAssignment && tooltipRef.current) {
      const { innerWidth, innerHeight } = window;
      const tooltip = tooltipRef.current;
      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;
      let x = hoveredAssignment.x + 15;
      let y = hoveredAssignment.y + 15;

      if (x + tooltipWidth > innerWidth) {
        x = hoveredAssignment.x - tooltipWidth - 15;
      }
      if (y + tooltipHeight > innerHeight) {
        y = hoveredAssignment.y - tooltipHeight - 15;
      }

      tooltip.style.left = `${x}px`;
      tooltip.style.top = `${y}px`;
    }
  }, [hoveredAssignment]);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>←</button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={goToNextMonth}>→</button>
      </div>

      <div className="selected-date-display">
        {selectedDate ? `Selected Date: ${selectedDate}` : "Click a day to select it"}
      </div>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div className="weekday" key={day}>{day}</div>
        ))}
        {renderDays()}
      </div>

      {hoveredAssignment && (
        <div className="tooltip" ref={tooltipRef}>
          <strong>{hoveredAssignment.title}</strong>
          <p><b>Class:</b> {hoveredAssignment.class}</p>
          <p>{hoveredAssignment.description}</p>
        </div>
      )}
    </div>
  );
};

export default Calendar;
