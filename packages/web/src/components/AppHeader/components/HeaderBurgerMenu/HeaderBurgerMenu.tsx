/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";

import "./HeaderBurgerMenu.scss";

import BurgerIcon from "resources/icons/menu-burger.svg";

export interface IBurgerMenuProps {
  openMenuHandler: (toggle: boolean) => void;
}

export const HeaderBurgerMenu = ({ openMenuHandler }: IBurgerMenuProps) => {
  return (
    <div
      className="dd-wrapper ApplicationMenuItem HeaderBurgerMenu"
      onClick={() => openMenuHandler(true)}
    >
      <div className="dd-header">
        <div className="circular">
          <BurgerIcon />
        </div>
      </div>
    </div>
  );
};
