import React from "react";
import { Button, Dialog, DialogTrigger, Popover } from "react-aria-components";
import { useAuth } from "../features/authentication/hooks/useAuth";

const UserIconButton = ({ name }) => {
  return (
    <Button aria-label="Notifications" className="user-icon">
      {name.charAt(0).toUpperCase()}
    </Button>
  );
};

function CustomPopover({ handleSettingsClick }) {
  const { user, logout } = useAuth();
  return (
    <DialogTrigger>
      <UserIconButton name={user?.name} />
      <Popover>
        <Dialog>
          <div className="popover-container">
            <span className="popover-link" onClick={handleSettingsClick}>
              Settings
            </span>
            <span className="popover-link" onClick={logout}>
              Logout
            </span>
          </div>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}

export default CustomPopover;
