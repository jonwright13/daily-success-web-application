import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [authErr, setAuthErr] = useState("");
  const isAuthenticated = user && user !== null;

  const navigate = useNavigate();

  // Authenticates user and navigates to home
  const login = async (inputs) => {
    try {
      const res = await axios.post("/auth/login", inputs);
      setUser(res.data);
      setAuthErr("");
      navigate("/");
    } catch (err) {
      console.log("Error logging user in");
      setAuthErr(err.response.data);
    }
  };

  const register = async (inputs) => {
    try {
      const res = await axios.post("/auth/register", inputs);
      if (res.status === 200) {
        await login(inputs);
        setAuthErr("");
        navigate("/");
      }
    } catch (err) {
      setAuthErr(err.response.data);
    }
  };

  // Logs user out and redirects to homepage
  const logout = async () => {
    try {
      await axios.post("/auth/logout");
      setAuthErr("");
    } catch (err) {
      console.log("Error logging user out");
      setAuthErr(err.response.data);
    }
    setUser(null);
    navigate("/", { replace: true });
  };

  const changeName = async (inputs) => {
    try {
      const res = await axios.put("/auth/change-name", inputs);
      setUser(res.data);
      setAuthErr("");
    } catch (err) {
      setAuthErr(err.response.data);
    }
  };

  const changeEmail = async (inputs) => {
    try {
      await axios.put("/auth/change-email", inputs);
      setAuthErr("");
    } catch (err) {
      setAuthErr(err.response.data);
    }
  };

  const changePassword = async (inputs) => {
    try {
      await axios.put("/auth/change-password", inputs);
      setAuthErr("");
    } catch (err) {
      setAuthErr(err.response.data);
    }
  };

  const confirmPassword = async (password) => {
    try {
      const res = await axios.post("/auth/confirm-password", { password });
      setAuthErr("");
      return true;
    } catch (err) {
      setAuthErr(err.response.data);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authErr,
        isAuthenticated,
        login,
        logout,
        register,
        changeName,
        changeEmail,
        changePassword,
        confirmPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Exposes user's state and methods for user login and logout
export const useAuth = () => {
  return useContext(AuthContext);
};
