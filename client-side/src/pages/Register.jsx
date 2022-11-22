import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errText, setErrText] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (error) {
      setErrText(error.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form action="" onSubmit={handleSubmit}>
        <input
          required
          type="text"
          name="username"
          id=""
          placeholder="username*"
          onChange={handleChange}
        />
        <input
          required
          type="email"
          name="email"
          id=""
          placeholder="email*"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          name="password"
          id=""
          placeholder="password*"
          onChange={handleChange}
        />
        <button>Register</button>
        {errText && <p>{errText}</p>}
        <span>
          Do you have an account? <Link to="/login">Log In</Link>{" "}
        </span>
      </form>
    </div>
  );
};

export default Register;
