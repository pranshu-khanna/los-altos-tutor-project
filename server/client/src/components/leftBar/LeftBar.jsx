import "./leftBar.scss";
import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Calendar from "../../assets/calendar.png";
import Class from "../../assets/class.png";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/authContext";

const LeftBar = () => {
  const {currentUser, logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const isStudent = currentUser?.role === "student";
  const classSectionTitle = isStudent ? "My Classes" : "Classes You Teach";

  const handleLogout = async () => {
      await logout();
      navigate("/login");
  };

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="item">
            <Link to="/calendar" style={{textDecoration: "none", display: "flex", alignItems: "center", gap: "15px"}}>
              <img src={Calendar} alt="Calendar Icon"/>
              <span>My Calendar</span>
            </Link>
          </div>
          <div className="item" style={{cursor: "pointer"}}>
            <Link to="/classes" style={{textDecoration: "none", display: "flex", alignItems: "center", gap: "15px"}}>
              <img src={Class} alt="Classes Icon" />
              <span>My Classes</span>
            </Link>
          </div>

          <div className="item">
            {isStudent ? (
              <div className="item">
                <Link to="/search" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "15px" }}>
                  <SearchOutlinedIcon />
                  <span>Find Classes</span>
                </Link>
              </div>
            ) : (
              <div className="item">
                <Link to="/launch" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "15px" }}>
                  <AddIcon/>
                  <span>Launch Class</span>
                </Link>
              </div>
            )}
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
            <LogoutIcon/>
            <button type="button" onClick={handleLogout}>Logout</button>          
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;