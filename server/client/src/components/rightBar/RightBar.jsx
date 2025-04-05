import "./rightBar.scss";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext.js"

const RightBar = () => {
  const {currentUser} = useContext(AuthContext);

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item"></div>
        <div className="item"></div>
        <div className="item"></div>
      </div>
    </div>
  );
};

export default RightBar;