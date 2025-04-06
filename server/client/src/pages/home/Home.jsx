import "./home.scss";
import {AuthContext} from "../../context/authContext.js"
import React, {useContext} from "react";

const Home = () => {
  const {currentUser} = useContext(AuthContext);

  let message = "";

  if (currentUser?.role === "student") {
    message = "Discover personalized courses, match with expert tutors, and take control of your learning journey — all in one place.";
  } else {
    message = "Share your expertise, manage your classes, and empower students with personalized support — all in one place.";
  }

  return (
    <div className="home">
      <div className="overlay">
        <div className="text-container">
          <h1>Welcome to Upskill-Me</h1>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;