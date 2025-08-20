/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";

import RemoveIcon from "../../resources/icons/x.svg";

import "./Pill.scss";

export type PillType = { id: number; title: string };

export interface IPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  title: string;
  isActive?: boolean;
  removable?: boolean;
  showIcon?: boolean;
}

export const Pill = ({
  title,
  isActive,
  removable = false,
  showIcon,
  ...props
}: IPillProps) => (
  <span
    {...props}
    className={`pill-box ${removable ? "removable" : ""} ${
      isActive ? "active" : ""
    }`}
  >
    {title}
    {showIcon && (
      <span className="PillsIcon">
        <RemoveIcon />
      </span>
    )}
  </span>
);
