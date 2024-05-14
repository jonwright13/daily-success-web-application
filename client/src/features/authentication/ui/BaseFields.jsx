import { Link } from "react-router-dom";

export const Name = ({ name, value = "", onChange, onClickAway = null }) => {
  return (
    <input
      name={name}
      type="text"
      placeholder={name}
      value={value}
      onChange={onChange}
      autoComplete="name"
      onBlur={onClickAway}
    />
  );
};

export const Email = ({
  name,
  value = "",
  onChange,
  onClickAway = null,
  disabled = false,
}) => {
  return (
    <input
      name={name}
      type="email"
      placeholder={name}
      value={value}
      onChange={onChange}
      autoComplete="email"
      disabled={disabled}
      onBlur={onClickAway}
    />
  );
};

export const Password = ({ name, onChange, autoComplete = false }) => {
  const placeholder =
    name === "password" ? "Enter password" : "Confirm password";
  return (
    <input
      name={name}
      type="password"
      placeholder={placeholder}
      autoComplete={autoComplete ? "current-password" : ""}
      onChange={onChange}
    />
  );
};

export const SubmitButton = ({ onSubmit }) => {
  return <button onClick={onSubmit}>Login</button>;
};

export const Errors = ({ authErr }) => {
  return authErr && <p>{authErr}</p>;
};

export const ReferLink = ({ to }) => {
  const text =
    to === "register" ? "Already have an account?" : "Don't have an account?";
  return (
    <span>
      {text} <Link to={`/${to}`}>{to}</Link>
    </span>
  );
};
