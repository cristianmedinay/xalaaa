/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ThemeContext } from "@xala/common";
import cx from "classnames";
import React, { useCallback, useContext } from "react";

import CheckCircle from "../../resources/icons/check-circle.svg";
import CloseCircle from "../../resources/icons/close-circle.svg";
import ProcessCircle from "../../resources/icons/process-circle.svg";

import "./Result.scss";

enum ResultType {
  success = "success",
  process = "process",
  error = "error",
}

export interface ResultProps {
  icon?: React.ReactNode;
  type?: keyof typeof ResultType;
  title?: string;
  subtitle?: string;
  extra?: React.ReactNode;
}

const icons = {
  success: CheckCircle,
  process: ProcessCircle,
  error: CloseCircle,
};

export const Result: React.FC<ResultProps> = ({
  icon,
  extra,
  type = ResultType.success,
  title,
  subtitle,
}) => {
  const { themeProvider } = useContext(ThemeContext);
  const renderIcon = useCallback(() => {
    if (icon) {
      return icon;
    }

    const Icon = icons[type];

    const processStyle: React.CSSProperties = {
      color: themeProvider.getColor("AppPrimaryColor"),
    };

    return (
      <div
        className={cx("Result__icon", {
          "Result__icon--success": type === ResultType.success,
          "Result__icon--error": type === ResultType.error,
        })}
        style={type === ResultType.process ? processStyle : undefined}
      >
        <Icon />
      </div>
    );
  }, [icon, type]);

  return (
    <div className="Result">
      {renderIcon()}
      {title && <h1 className="text-upper text-center">{title}</h1>}
      {subtitle && <p className="text-center text-large">{subtitle}</p>}
      {extra}
    </div>
  );
};
