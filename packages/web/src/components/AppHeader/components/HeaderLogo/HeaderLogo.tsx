/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ROUTES, ThemeContext } from "@xala/common";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import wideLogo from "resources/logo-laxarxa.svg";

import "./HeaderLogo.scss";

interface IHeaderLogoProps {
  className?: string;
}

export const HeaderLogo = ({ className }: IHeaderLogoProps) => {
  const themeContext = useContext(ThemeContext);
  const logo = themeContext.themeProvider.getWebHeaderLogoUrl();

  return (
    <div className="HeaderLogo">
      <Link to={ROUTES.HOME}>
        <img
          alt="La xarxa"
          className={`HeaderLogo__image ${className}`}
          src={logo || wideLogo}
        />
      </Link>
    </div>
  );
};
