import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  Email,
  Password,
  SubmitButton,
  Errors,
  ReferLink,
} from "../ui/BaseFields";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { login, authErr } = useAuth();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on click
    await login(inputs);
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <Email name="email" value={inputs.email} onChange={handleChange} />
        <Password name="password" onChange={handleChange} />
        <SubmitButton onSubmit={handleSubmit} />
        <Errors authErr={authErr} />
        <ReferLink to="register" />
      </form>
    </div>
  );
};

export default Login;
