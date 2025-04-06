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
              <img src="data:image/png;base64,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" alt=""/>
              <span>{currentUser.name}</span>
            </div>
          </div>
        </div>
      );
}

export default NavBar;