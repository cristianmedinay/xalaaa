/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";

import "./Reaction.scss";

import reactions from "../../resources/reactions";

import { ReactionType } from "./types";

import cx from "classnames";

export interface IReactionsProps {
  type: ReactionType;
  percentage?: number;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
  onHover?: (mouseOver: boolean) => void;
  children?: React.ReactNode;
}

export const Reaction: React.FC<IReactionsProps> = React.memo(
  ({ type, percentage, children, onClick, onHover }: IReactionsProps) => (
    <div className="reaction">
      <img
        src={reactions[type]}
        className={cx("reaction__icon")}
        onClick={onClick}
        onMouseEnter={() => onHover?.(true)}
        onMouseOut={() => onHover?.(false)}
      />

      {percentage !== undefined && (
        <div className="reaction__percentage">{percentage}%</div>
      )}

      {children}
    </div>
  )
);
