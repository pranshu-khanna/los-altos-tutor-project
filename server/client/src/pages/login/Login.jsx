import "./login.scss";
import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext.js";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  
  const handleChange = event => {
    setInputs((prevInputs) => ({...prevInputs, [event.target.name]: event.target.value}));
  }

  const {login} = useContext(AuthContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    };
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Upskill-Me.</h1>
          <p>Personalized course discovery and seamless tutor matching — all in one place.</p>
          <span>Don't you have an account?</span>
          <Link to ="/register">
              <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
            {err && <span className="error">{err}</span>}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;