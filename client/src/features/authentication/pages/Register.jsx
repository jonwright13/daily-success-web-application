import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  Name,
  Email,
  Password,
  SubmitButton,
  Errors,
  ReferLink,
} from "../ui/BaseFields";

const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const { register, authErr } = useAuth();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on click
    await register(inputs);
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <Name name="name" value={inputs.name} onChange={handleChange} />
        <Email name="email" value={inputs.email} onChange={handleChange} />
        <Password name="password" onChange={handleChange} />
        <Password name="passwordConfirm" onChange={handleChange} />
        <SubmitButton onSubmit={handleSubmit} />
        <Errors authErr={authErr} />
        <ReferLink to="login" />
      </form>
    </div>
  );
};

export default Register;
