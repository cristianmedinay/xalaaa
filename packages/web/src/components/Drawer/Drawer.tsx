/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import RcDrawer from "rc-drawer";
import { IDrawerProps as IRcDrawerProps } from "rc-drawer/lib/IDrawerPropTypes";
import React from "react";

import XIcon from "../../resources/icons/x.svg";

import "./Drawer.scss";

type IDrawerProps = IRcDrawerProps;

export class Drawer extends React.Component<IDrawerProps> {
  render() {
    const { children, ...props } = this.props;
    return (
      <RcDrawer handler={false} level={null} showMask={true} {...props}>
        <div className="drawer-wrapper-body">
          <div className="drawer-header">
            {this.props.onClose && (
              <div
                aria-label="Close"
                className="drawer-close"
                onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                  this.props.onClose?.(event)
                }
              >
                <i className="drawer-close-icon">
                  <XIcon />
                </i>
              </div>
            )}
            {this.props.title && (
              <div className="drawer-title">{this.props.title}</div>
            )}
          </div>

          <div className="drawer-body">{children}</div>
        </div>
      </RcDrawer>
    );
  }
}
