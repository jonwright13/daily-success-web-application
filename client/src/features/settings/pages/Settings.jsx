import React, { useState } from "react";
import Account from "../../authentication/pages/Account";
import Goal from "./Goal";
import Moods from "./Moods";

const Settings = ({ settingsVisible, setSettingsVisible }) => {
  const [page, setPage] = useState("Account");

  const handlePageSwitch = () => {
    switch (page) {
      case "Account":
        return <Account />;
      case "Goal":
        return <Goal />;
      case "Moods":
        return <Moods />;
      default:
        return null;
    }
  };

  return (
    <div className="settings-overlay">
      <div className="container">
        <div className="header">
          <div
            className="back-btn"
            onClick={() => setSettingsVisible(!settingsVisible)}
          >
            ◄ Back
          </div>
          <h1>Settings</h1>
        </div>
        <div className="content">
          <div className="sidebar">
            <span className="link" onClick={() => setPage("Account")}>
              Account
            </span>
            <span className="link" onClick={() => setPage("Goal")}>
              Goal
            </span>
            <span className="link" onClick={() => setPage("Moods")}>
              Moods
            </span>
          </div>
          <div className="details">
            <div className="details-header">
              <h3>{page}</h3>
            </div>
            <div className="details-content">{handlePageSwitch()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
