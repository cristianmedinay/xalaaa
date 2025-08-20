/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import RcTooltip from "rc-tooltip";
import { TooltipProps as RcTooltipProps } from "rc-tooltip/lib/Tooltip";
import React from "react";

import "./Tooltip.scss";

export interface TooltipProps extends Partial<RcTooltipProps> {
  title: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  title,
  ...props
}) => {
  return (
    <RcTooltip animation="zoom" overlay={<span>{title}</span>} {...props}>
      {children}
    </RcTooltip>
  );
};
