/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import cx from "classnames";
import { SelectProps } from "rc-select";
import React from "react";

import "./InputMultiSelect.scss";
import { InputSelect } from "./InputSelect";

interface IInputMultiSelect extends SelectProps {
  onClick?: () => void;
}

export const InputMultiSelect = ({
  children,
  onClick,
  ...props
}: IInputMultiSelect) => {
  const menuItemSelectedIcon = (props: any) => {
    return (
      <div
        className={cx(
          "InputMultiSelect__selectIcon",
          props.isSelected && "InputMultiSelect__selectIcon--checked"
        )}
      ></div>
    );
  };

  return (
    <div className="InputMultiSelect">
      <InputSelect
        className="InputMultiSelect"
        dropdownClassName="InputMultiSelect__dropdown"
        mode="multiple"
        allowClear={false}
        removeIcon={false}
        menuItemSelectedIcon={menuItemSelectedIcon}
        onClick={onClick}
        {...props}
      >
        {children}
      </InputSelect>
    </div>
  );
};
