import "./home.scss";
import {AuthContext} from "../../context/authContext.js"
import React, {useContext} from "react";

const Home = () => {
  const {currentUser} = useContext(AuthContext);
  const isStudent = currentUser?.role === "student";

  return (
    <div className={`home ${isStudent ? "student" : "tutor"}`}>
      <div className="overlay">
        <div className="text-container">
          <h1>Welcome to Upskill-Me</h1>
          <p>
            {isStudent
              ? "Discover personalized courses, match with expert tutors, and take control of your learning journey — all in one place."
              : "Share your expertise, manage your classes, and empower students with personalized support — all in one place."
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;