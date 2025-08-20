/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import cx from "classnames";
import React from "react";

import { Tooltip } from "components/Tooltip";
import { MediaButtonVariant } from "enums";

import { LoaderSpinner } from "../LoaderSpinner";

import "./MediaButton.scss";

export interface IMediaButtonProps {
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconElevated?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  variant: MediaButtonVariant;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode | string;
  loading?: boolean;
  trailer?: boolean;
  tooltip?: string;
}

export class MediaButton extends React.PureComponent<IMediaButtonProps> {
  render() {
    const {
      className,
      children,
      disabled,
      icon,
      iconElevated,
      loading,
      type,
      variant,
      onClick,
      trailer,
      tooltip,
      ...props
    } = this.props;

    return (
      <button
        className={cx("MediaButton", `MediaButton--${variant}`, className, {
          "MediaButton--loading": loading,
        })}
        disabled={disabled || loading}
        type={type}
        onClick={onClick}
        {...props}
      >
        {loading && (
          <LoaderSpinner
            className="MediaButton__LoaderSpinner"
            width={25}
            height={25}
          />
        )}
        {icon && tooltip && (
          <Tooltip title={tooltip} placement="top">
            <i
              className={cx("MediaButton__icon", {
                "MediaButton__icon--elevated": iconElevated,
                "MediaButton__icon--trailer": trailer,
              })}
            >
              {icon}
            </i>
          </Tooltip>
        )}

        {icon && !tooltip && (
          <i
            className={cx("MediaButton__icon", {
              "MediaButton__icon--elevated": iconElevated,
              "MediaButton__icon--trailer": trailer,
            })}
          >
            {icon}
          </i>
        )}
        {children && <span className="MediaButton__text">{children}</span>}
      </button>
    );
  }
}
