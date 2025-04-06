import "./leftBar.scss";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Calendar from "../../assets/calendar.png";
import Class from "../../assets/class.png";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from "../../context/authContext";

const LeftBar = () => {
  const {currentUser} = useContext(AuthContext);
  const [classesExpanded, setClassesExpanded] = useState(false);

  const dummyClasses = [
    "math",
    "english",
    "spanish",
    "history",
    "robotics",
  ];

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="item">
            <Link to="/calendar" style={{textDecoration: "none", display: "flex", alignItems: "center", gap: "15px"}}>
              <img src={Calendar} alt="Calendar Icon" />
              <span>My Calendar</span>
            </Link>
          </div>
          <div className="item" onClick={() => setClassesExpanded(!classesExpanded)} style={{cursor: "pointer"}}>
            <div style={{display: "flex", alignItems: "center", gap: "15px"}}>
              <img src={Class} alt="Classes Icon" />
              <span>My Classes</span>
              {classesExpanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
            </div>
          </div>

          {classesExpanded && (
            <div className="class-list">
              {dummyClasses.map((cls) => (
                <Link
                  to={`/${cls.toLowerCase()}`}
                  key={cls}
                  style={{
                    textDecoration: "none",
                    marginLeft: "45px",
                    color: "inherit",
                  }}
                >
                  <div className="subclass-item">{cls.charAt(0).toUpperCase() + cls.slice(1)}</div>
                </Link>
              ))}
            </div>
          )}

          <div className="item">
            <Link to="/search" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "15px" }}>
              <SearchOutlinedIcon />
              <span>Find Classes</span>
            </Link>
          </div>
        </div>

        <div className="divider" />

        <div className="bottom-menu">
          <div className="item">
            <Link to ="/settings" style={{textDecoration: "none", display: "flex", alignItems: "center", gap: "15px"}}>
              <SettingsIcon />
              <span>Settings</span>
            </Link>
          </div>
          <div className="item">
            <Link to ="/logout" style={{textDecoration: "none", display: "flex", alignItems: "center", gap: "15px"}}>
              <LogoutIcon />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;