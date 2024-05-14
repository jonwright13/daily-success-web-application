import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import {
  ClickAwayNameField,
  ClickAwayEmailField,
  EditPasswordField,
} from "../ui/ClickAwayFields.jsx";

const Account = () => {
  const { user, authErr, changeName, changeEmail, changePassword } = useAuth();

  const [inputs, setInputs] = useState({
    name: user.name,
    email: user.email,
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    console.log(inputs);
    await changePassword(inputs);
  };

  const handleNameClickaway = async (e) => {
    await changeName(inputs);
  };

  const handEmailClickaway = async (e) => {
    await changeEmail(inputs);
  };

  return (
    <>
      <div className="form">
        <div className="form-header">
          <span>Name:</span>
          <span>Email:</span>
          <span>Password:</span>
        </div>
        <div className="entry">
          <ClickAwayNameField
            inputs={inputs}
            onChange={handleChange}
            onClickAway={handleNameClickaway}
          />
          <ClickAwayEmailField
            inputs={inputs}
            onChange={handleChange}
            onClickAway={handEmailClickaway}
          />
          <EditPasswordField onChange={handleChange} onSubmit={handleSubmit} />
        </div>
      </div>
      {authErr && <p>{authErr}</p>}
    </>
  );
};

export default Account;
