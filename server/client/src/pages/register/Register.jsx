import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import Select from "react-select";

const subjectOptions = [
  {value: "math", label: "Math" },
  {value: "english", label: "English"},
  {value: "spanish", label: "Spanish"},
  {value: "history", label: "History"},
  {value: "robotics", label: "Robotics"},
  {value: "science", label: "Science"},
  {value: "physics", label: "Physics"},
  {value: "art", label: "Art"},
  {value: "programming", label: "Programming"},
];

const Register = () => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    interests: "",
    availability: "",
  });
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [err, setErr] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));

    setValidationErrors((prevInputs) => {
      const updated = { ...prevInputs, [name]: false };
      const hasRemainingErrors = Object.entries(updated).some(([key, value]) => value);
      if (!hasRemainingErrors) setErr(null);
      return updated;
    });
  };

  const handleSubjectChange = (selectedOptions) => {
    setSelectedSubjects(selectedOptions);
    if (selectedOptions.length > 0) {
      setValidationErrors((prev) => ({ ...prev, interests: false }));
    }
  };

  const validateStepOne = () => {
    const newErrors = {};
    if (!role) newErrors.role = true;
    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0 ? null : "Please select a role.";
  };

  const validateStepTwo = () => {
    const { username, email, password, name } = inputs;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};

    if (!username) newErrors.username = true;
    if (!email || !emailRegex.test(email)) newErrors.email = true;
    if (!password) newErrors.password = true;
    if (!name) newErrors.name = true;
    if (selectedSubjects.length === 0) newErrors.interests = true;

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0 ? null : "Please fill out all fields correctly.";
  };

  const handleContinue = (event) => {
    event.preventDefault();
    const error = validateStepOne();
    if (error) {
      setErr(error);
    } else {
      setErr(null);
      setStep(2);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = validateStepTwo();
    if (error) {
      setErr(error);
      return;
    }
  
    const subjectList = selectedSubjects.map((subject) => subject.value);
    const userFormData = {
      ...inputs,
      role,
      studentSubjects: role === "student" ? subjectList : null,
      tutorSubjects: role === "tutor" ? subjectList : null,
    };
    try {
      await axios.post("http://localhost:8800/api/auth/register", userFormData);
    } catch (err) {
      setErr(err.response?.data || "Registration failed");
    }
  };

  const handleBack = (event) => {
    event.preventDefault();
    setErr(null);
    setValidationErrors({});
    setStep(1);
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Tutoring Platform.</h1>
          <p>Personalized course discovery and seamless tutor matching — all in one place.</p>
          <span>Already have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>{step === 1 ? "Register" : "More Info"}</h1>
          <div className="progress-indicator">Step {step} of 2</div>
          <form>
            {step === 1 && (
              <>
                <div className="input-wrapper">
                  <label>Are you a student or tutor?</label>
                  <div className="role-select">
                    <label>
                      <input
                        type="radio"
                        name="role"
                        value="student"
                        checked={role === "student"}
                        onChange={() => {
                          setRole("student");
                          setValidationErrors((prev) => ({ ...prev, role: false }));
                        }}
                      />
                      Student
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="role"
                        value="tutor"
                        checked={role === "tutor"}
                        onChange={() => {
                          setRole("tutor");
                          setValidationErrors((prev) => ({ ...prev, role: false }));
                        }}
                      />
                      Tutor
                    </label>
                  </div>
                  {validationErrors.role && <span className="exclam">!</span>}
                </div>

                {err && <span className="error">{err}</span>}
                <button onClick={handleContinue}>Continue</button>
              </>
            )}
            {step === 2 && (
              <>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={inputs.username}
                    onChange={handleChange}
                    className={validationErrors.username ? "input-error" : ""}
                  />
                  {validationErrors.username && <span className="exclam">!</span>}
                </div>
                <div className="input-wrapper">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={inputs.email}
                    onChange={handleChange}
                    className={validationErrors.email ? "input-error" : ""}
                  />
                  {validationErrors.email && <span className="exclam">!</span>}
                </div>
                <div className="input-wrapper">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={inputs.password}
                    onChange={handleChange}
                    className={validationErrors.password ? "input-error" : ""}
                  />
                  {validationErrors.password && <span className="exclam">!</span>}
                </div>
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={inputs.name}
                    onChange={handleChange}
                    className={validationErrors.name ? "input-error" : ""}
                  />
                  {validationErrors.name && <span className="exclam">!</span>}
                </div>

                <div className="input-wrapper">
                  <label>
                    {role === "student"
                      ? "What subjects are you interested in learning?"
                      : "What subjects are you interested in teaching?"}
                  </label>
                  <Select
                    isMulti
                    name="interests"
                    options={subjectOptions}
                    classNamePrefix="select"
                    onChange={handleSubjectChange}
                    value={selectedSubjects}
                    placeholder="Type to search subjects..."
                  />
                  {validationErrors.interests && <span className="exclam">!</span>}
                </div>

                {err && <span className="error">{err}</span>}
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={handleBack}>Back</button>
                  <button onClick={handleSubmit}>Submit</button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;