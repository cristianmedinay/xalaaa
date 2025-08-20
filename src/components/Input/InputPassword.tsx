/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import classNames from "classnames";
import * as React from "react";
import { useState } from "react";

import EyeInvisibleOutlined from "../../resources/icons/eye-invisible.svg";
import EyeOutlined from "../../resources/icons/eye.svg";

import { IInputProps, Input } from "./Input";

export interface IInputPasswordProps extends IInputProps {
  readonly inputPrefixCls?: string;
  readonly action?: string;
  visibilityToggle?: boolean;
  iconRender?: (visible: boolean) => React.ReactNode;
}

const ActionMap: Record<string, string> = {
  click: "onClick",
  hover: "onMouseOver",
};

const InputPassword = React.forwardRef<Input, IInputPasswordProps>(
  (props, ref) => {
    const [visible, setVisible] = useState(false);

    const onVisibleChange = () => {
      const { disabled } = props;
      if (disabled) {
        return;
      }

      setVisible(!visible);
    };

    const getIcon = (prefixCls: string) => {
      const { action, iconRender = () => null } = props;
      const iconTrigger = (action && ActionMap[action]) || "";
      const icon = iconRender(visible);
      const iconProps = {
        [iconTrigger]: onVisibleChange,
        className: `${prefixCls}-icon`,
        key: "passwordIcon",
        onMouseDown: (e: MouseEvent) => {
          // Prevent focused state lost
          // https://github.com/ant-design/ant-design/issues/15173
          e.preventDefault();
        },
        onMouseUp: (e: MouseEvent) => {
          // Prevent caret position change
          // https://github.com/ant-design/ant-design/issues/23524
          e.preventDefault();
        },
      };
      return React.cloneElement(
        React.isValidElement(icon) ? icon : <span>{icon}</span>,
        iconProps
      );
    };

    const renderPassword = () => {
      const { className, size, visibilityToggle, ...restProps } = props;

      const prefixCls = "input-password";
      const suffixIcon = visibilityToggle ? getIcon(prefixCls) : null;
      const inputClassName = classNames(prefixCls, className, {
        [`${prefixCls}-${size}`]: !!size,
      });

      const inputProps = {
        ...restProps,
        type: visible ? "text" : "password",
        className: inputClassName,
        suffix: suffixIcon,
      };
      delete inputProps.iconRender;

      return <Input ref={ref} {...inputProps} />;
    };

    return <>{renderPassword()}</>;
  }
);

InputPassword.defaultProps = {
  action: "click",
  visibilityToggle: true,
  iconRender: (visible: boolean) =>
    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />,
};

InputPassword.displayName = "Password";

export { InputPassword };
