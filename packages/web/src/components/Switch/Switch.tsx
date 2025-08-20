/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ThemeContext } from "@xala/common";
import Color from "color";
import React from "react";
import ReactSwitch, { ReactSwitchProps } from "react-switch";

import "./Switch.scss";

export type ISwitchProps = ReactSwitchProps;

export class Switch extends React.PureComponent<ISwitchProps> {
  static contextType = ThemeContext;

  static defaultProps = {
    checkedIcon: false,
    uncheckedIcon: false,
    handleDiameter: 25,
    height: 15,
    width: 45,
    activeBoxShadow: "",
  };

  render() {
    const themeProvider = this.context.themeProvider;
    const {
      onColor = Color(themeProvider.getColor("AppPrimaryColor"))
        .darken(0.5)
        .hex(),
      onHandleColor = themeProvider.getColor("AppPrimaryColor"),
      offColor = Color(themeProvider.getColor("AppSecondaryColor"))
        .darken(0.5)
        .hex(),
      offHandleColor = themeProvider.getColor("AppSecondaryColor"),
      ...props
    } = this.props;

    return (
      <ReactSwitch
        onColor={onColor}
        onHandleColor={onHandleColor}
        offColor={offColor}
        offHandleColor={offHandleColor}
        {...props}
      />
    );
  }
}
