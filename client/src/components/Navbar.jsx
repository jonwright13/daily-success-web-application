import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logo.png";
import { useAuth } from "../features/authentication/hooks/useAuth.js";
import useNavigation from "../hooks/useNavigation.js";
import CustomPopover from "./CustomPopover.jsx";
import Settings from "../features/settings/pages/Settings.jsx";

const Navbar = () => {
  const [settingsVisible, setSettingsVisible] = useState(false);
  const { user } = useAuth();
  const { getLocation } = useNavigation();

  const handleSettingsClick = () => {
    setSettingsVisible(!settingsVisible);
  };

  const locationCheck = getLocation !== "/login" && getLocation !== "/register";

  // Don't display navbar on login or register pages
  if (locationCheck) {
    return (
      <div className="navbar">
        {settingsVisible && (
          <Settings
            settingsVisible={settingsVisible}
            setSettingsVisible={setSettingsVisible}
          />
        )}
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>
          </div>

          {user ? (
            <div className="links">
              <span className="write">
                <Link className="link" to="/write">
                  Write
                </Link>
              </span>

              <CustomPopover handleSettingsClick={handleSettingsClick} />
            </div>
          ) : (
            <div className="links">
              <Link className="link" to="/about">
                <h6>About</h6>
              </Link>
              <Link className="link" to="/login">
                Login
              </Link>
              /
              <Link className="link" to="/register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Navbar;
