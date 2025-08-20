/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { StringHelper } from "@xala/common";
import Select, { SelectProps } from "rc-select";
import { DefaultOptionType } from "rc-select/lib/Select";
import React, { useCallback } from "react";

import { LoaderSpinner, Tooltip } from "components";
import ChevronDown from "resources/icons/chevron-down.svg";
import QuestionmarkIcon from "resources/icons/questionmark.svg";

import "./InputSelect.scss";
interface IInputSelectProps extends SelectProps {
  tooltipText?: string;
  setItemValue?: (value: number) => void;
  setItemValueString?: (value: string) => void;
}

export const InputSelect = ({
  tooltipText,
  children,
  setItemValue,
  setItemValueString,
  loading,
  ...props
}: IInputSelectProps) => {
  const handleSelect = (value: DefaultOptionType) => {
    if (setItemValue && typeof value === "number") {
      setItemValue(value);
    }
    if (setItemValueString && typeof value === "string") {
      setItemValueString(value);
    }
  };

  const handleDiacritics = useCallback(
    (inputValue: string, option: DefaultOptionType | undefined) => {
      let searchValue = "";
      let childrenItem = "";

      if (
        typeof option?.children === "string" ||
        typeof option?.children === "number"
      ) {
        searchValue = inputValue.toLowerCase();
        childrenItem = String(option?.children).toLowerCase();
      } else {
        searchValue = inputValue.toLowerCase();
        childrenItem = option?.children?.join("").toLowerCase() || "";
      }

      return StringHelper.latinize(childrenItem).includes(
        StringHelper.latinize(searchValue)
      );
    },
    []
  );

  return (
    <div className="InputSelect__container">
      <Select
        prefixCls="InputSelect"
        suffixIcon={() => (loading ? <LoaderSpinner /> : <ChevronDown />)}
        menuItemSelectedIcon={() => null}
        showSearch
        filterOption={handleDiacritics}
        virtual={false}
        dropdownAlign={{ offset: [-2, 1] }}
        onSelect={handleSelect}
        dropdownStyle={{ zIndex: 100, position: "absolute" }}
        showAction={["focus", "click"]}
        {...props}
      >
        {children}
      </Select>
      {tooltipText && (
        <div className="InputSelect__icon">
          <Tooltip placement="top" title={tooltipText}>
            <QuestionmarkIcon />
          </Tooltip>
        </div>
      )}
    </div>
  );
};
