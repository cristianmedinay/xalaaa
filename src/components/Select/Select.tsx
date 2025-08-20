/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import RcSelect, { Option, SelectProps as RcSelectProps } from "rc-select";
import React from "react";

import ChevronDown from "../../resources/icons/chevron-down.svg";

import "./Select.scss";

export const Select = <VT extends string | number>({
  children,
  ...props
}: RcSelectProps<VT>) => {
  return (
    <RcSelect<VT>
      prefixCls="Select"
      suffixIcon={() => <ChevronDown />}
      menuItemSelectedIcon={() => null}
      dropdownAlign={{
        offset: [0, -1],
      }}
      {...props}
    >
      {children}
    </RcSelect>
  );
};

export { Option };
