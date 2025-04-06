import "./leftBar.scss";
import React, {useContext} from "react";
import {Link} from "react-router-dom";
import Calendar from "../../assets/calendar.png";
import Class from "../../assets/class.png";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {AuthContext} from "../../context/authContext";

const LeftBar = () => {
  const {currentUser} = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="item">
            <Link to="/calendar" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "15px" }}>
              <img src={Calendar} alt="Calendar Icon" />
              <span>My Calendar</span>
            </Link>
          </div>
          <div className="item">
            <Link to="/classes" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "15px" }}>
              <img src={Class} alt="Classes Icon" />
              <span>My Classes</span>
            </Link>
          </div>
          <div className="item">
            <Link to="/search" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "15px" }}>
              <SearchOutlinedIcon />
              <span>Find Classes</span>
            </Link>
          </div>
        </div>
        <div className="bottom-menu">
        <div className="divider"/>
          <div className="item">
            <SettingsIcon />
            <span>Settings</span>
          </div>
          <div className="item">
            <LogoutIcon />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
