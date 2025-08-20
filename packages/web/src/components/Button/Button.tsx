/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ThemeContext } from "@xala/common";
import cx from "classnames";
import * as React from "react";

import "./Button.scss";

interface Props {
  buttonActiveClassName?: string;
  buttonClassName?: string;
  disabled?: boolean;
  key?: number | string;
  onBlur?: () => void;
  onFocus?: () => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "button" | "reset" | "submit" | undefined;
  style?: Record<string, string | number>;
  focusStyle?: Record<string, string | number>;
}

interface State {
  active: boolean;
}

/**
 * Button component
 * @exports Button [default]
 */
class Button extends React.Component<Props, State> {
  public static defaultProps = {
    buttonActiveClassName: "Button-container--button--active",
    buttonClassName: "Button-container--button",
  };

  public state = {
    active: false,
  };

  static contextType = ThemeContext;

  private button: HTMLButtonElement | null = null;

  public render() {
    const {
      children,
      buttonActiveClassName,
      buttonClassName,
      onClick,
      disabled,
      style,
      focusStyle,
      ...props
    } = this.props;
    const { active } = this.state;
    const themeProvider = this.context.themeProvider;

    let buttonActiveStyle: React.CSSProperties = {};

    if (!focusStyle) {
      buttonActiveStyle.backgroundColor =
        themeProvider.getColor("AppPrimaryColor");
    } else {
      buttonActiveStyle = focusStyle;
    }

    return (
      <button
        className={cx("Btn", buttonClassName, active && buttonActiveClassName)}
        style={active ? buttonActiveStyle : style}
        ref={(ref: HTMLButtonElement) => (this.button = ref)}
        disabled={disabled ? true : undefined}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
}

export default Button;
