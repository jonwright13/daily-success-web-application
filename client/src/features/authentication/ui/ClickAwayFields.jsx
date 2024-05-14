import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth.js";
import { Name, Email, Password } from "./BaseFields.jsx";

export const ClickAwayNameField = ({ inputs, onChange, onClickAway }) => {
  const [edit, setEdit] = useState(false);
  const handleClickAway = () => {
    onClickAway();
    setEdit(false);
  };
  return (
    <div className="clickaway-field" onClick={() => setEdit(true)}>
      {edit ? (
        <Name
          name="name"
          value={inputs.name}
          onChange={onChange}
          onClickAway={handleClickAway}
        />
      ) : (
        <div>{inputs.name}</div>
      )}
    </div>
  );
};

export const ClickAwayEmailField = ({ inputs, onChange, onClickAway }) => {
  const [edit, setEdit] = useState(false);
  const handleClickAway = () => {
    onClickAway();
    setEdit(false);
  };
  return (
    <div className="clickaway-field" onClick={() => setEdit(true)}>
      {edit ? (
        <Email
          name="email"
          value={inputs.email}
          onChange={onChange}
          onClickAway={handleClickAway}
        />
      ) : (
        <div>{inputs.email}</div>
      )}
    </div>
  );
};

export const EditPasswordField = ({ onChange, onSubmit }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [edit, setEdit] = useState(false);
  const [password, setPassword] = useState("");

  const { confirmPassword } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    setEdit(() => {
      setConfirmed(false);
      return false;
    });
  };

  const handleConfirmPassword = async (e) => {
    e.preventDefault();
    console.log(password);
    const res = await confirmPassword(password);
    console.log({ res });
    setConfirmed(res);
  };

  if (edit) {
    if (confirmed) {
      return (
        <>
          <div className="passwords">
            <Password name="password" onChange={onChange} />
            <Password name="passwordConfirm" onChange={onChange} />
          </div>
          <div className="form-buttons">
            <button onClick={handleSubmit}>Save</button>
            <button onClick={() => setEdit(false)}>Cancel</button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Password
            name="passwordConfirm"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleConfirmPassword}>Confirm</button>
        </>
      );
    }
  } else {
    return <button onClick={() => setEdit(true)}>Change Password</button>;
  }
};
