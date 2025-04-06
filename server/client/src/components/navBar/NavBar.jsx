import React from "react";
import "./navBar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {DarkModeContext} from "../../context/darkModeContext";
import {AuthContext} from "../../context/authContext";

const NavBar = () => {
    const {toggle, darkMode} = useContext(DarkModeContext);
    const {currentUser} = useContext(AuthContext);
    return (
        <div className="navBar">
          <div className="left">
            <Link to="/" style={{textDecoration: "none"}}>
              <span>upskill-me</span>
            </Link>
            {darkMode ? <WbSunnyOutlinedIcon onClick = {toggle}/> : <DarkModeOutlinedIcon onClick = {toggle}/>}
          </div>
          <div className="right">
            <div className="user">
              <img alt=""/>
              <span>John Doe</span>
            </div>
          </div>
        </div>
      );
}

export default NavBar;