import React from "react";
import Logo from "../img/logo.png";
import useNavigation from "../hooks/useNavigation";

const Footer = () => {
  const { getLocation } = useNavigation();
  if (getLocation !== "/login" && getLocation !== "/register") {
    return (
      <footer>
        <img src={Logo} alt="" />
        <span>
          Made with ♥️ and <b>React.js</b>.
        </span>
      </footer>
    );
  }
};

export default Footer;
