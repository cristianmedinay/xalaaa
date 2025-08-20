/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import cx from "classnames";
import * as React from "react";

import LeftArrowIcon from "resources/icons/left-arrow.svg";
import RightArrowIcon from "resources/icons/right-arrow.svg";

import "./ListComponentArrow.scss";

export interface IListComponentArrowProps {
  containerStyle?: React.CSSProperties;
  onClick?: (event?: React.MouseEvent) => void;
  direction: "left" | "right";
  className?: string;
  hideForTabletAndMobile?: boolean;
  disable?: boolean;
}

export class ListComponentArrow extends React.Component<IListComponentArrowProps> {
  private handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (this.props.onClick) {
      this.props.onClick(e);

      return;
    }
  };

  public render() {
    const {
      containerStyle,
      direction,
      className = "",
      hideForTabletAndMobile,
      disable = false,
    } = this.props;
    const isDisabled = className.includes("slick-disabled") || disable;

    return (
      <div
        className={cx(
          "ListComponentArrow",
          `ListComponentArrow--${direction}`,
          {
            "ListComponentArrow--hide-for-tablet-and-mobile":
              hideForTabletAndMobile,
          },
          { disabled: isDisabled }
        )}
        style={containerStyle}
        onClick={this.handleClick}
      >
        {direction === "left" ? <LeftArrowIcon /> : <RightArrowIcon />}
      </div>
    );
  }
}
