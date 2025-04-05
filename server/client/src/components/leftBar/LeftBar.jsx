import "./leftBar.scss";
import {useContext} from "react";
import {AuthContext} from "../../context/authContext";

const LeftBar = () => {
  const {currentUser} = useContext(AuthContext);

  return (
      <div className="leftBar">
         <div className="container">
          <div className="menu"></div>
          <hr/>
          <div className="menu"></div>
          <hr />
          <div className="menu"></div>
        </div>
      </div>
  );
}

export default LeftBar;