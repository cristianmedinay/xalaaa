/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";

import "./MediaIcon.scss";

export interface IMediaIconProps {
  style?: React.CSSProperties;
  onIconClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onBackgroundClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  hideIcon?: boolean;
}

export const MediaIcon: React.FC<IMediaIconProps> = ({
  style,
  onIconClick,
  onBackgroundClick,
  hideIcon,
  children,
}) => {
  const onIconClickListener = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (onIconClick) {
      e.stopPropagation();
      onIconClick(e);
    }
  };
  const onBackgroundClickListener = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (onBackgroundClick) {
      e.stopPropagation();
      onBackgroundClick(e);
    }
  };

  return (
    <div
      className="MediaIcon"
      style={style}
      onClick={onBackgroundClickListener}
    >
      {!hideIcon && <i onClick={onIconClickListener}>{children}</i>}
    </div>
  );
};
