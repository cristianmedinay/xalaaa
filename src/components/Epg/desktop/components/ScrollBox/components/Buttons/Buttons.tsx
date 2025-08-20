/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";

import LeftArrowIcon from "resources/icons/left-arrow.svg";
import RightArrowIcon from "resources/icons/right-arrow.svg";

import "./Buttons.scss";

interface ButtonsProps {
  height: number;
  scroll: (number: number) => void;
}

const Buttons = (props: ButtonsProps) => {
  const { height, scroll } = props;
  return (
    <div className="epg-desktop-buttons">
      <div className="epg-desktop-buttons__container" style={{ height }}>
        <button
          className="epg-desktop-buttons__button"
          onClick={() => scroll(-500)}
        >
          <LeftArrowIcon />
        </button>
      </div>
      <div className="epg-desktop-buttons__container right" style={{ height }}>
        <button
          className="epg-desktop-buttons__button"
          onClick={() => scroll(500)}
        >
          <RightArrowIcon />
        </button>
      </div>
    </div>
  );
};

export default Buttons;
