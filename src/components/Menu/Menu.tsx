/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import RcMenu, { MenuProps as RcMenuProps } from "rc-menu";
import { MenuClickEventHandler as RcMenuClickEventHandler } from "rc-menu/lib/interface";
import React from "react";

import "./Menu.scss";

export type MenuClickEventHandler = RcMenuClickEventHandler;

export type IMenuProps = RcMenuProps;

export const Menu: React.FC<IMenuProps> = ({ children, ...props }) => (
  <RcMenu prefixCls="Menu" {...props}>
    {children}
  </RcMenu>
);
