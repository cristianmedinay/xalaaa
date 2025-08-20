/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { RouteHelper } from "@xala/common";
import React from "react";

import LeftArrowIcon from "resources/icons/left-arrow.svg";

import "./PageHeader.scss";

export interface IPageHeaderProps {
  title?: string;
}

export const PageHeader: React.FC<IPageHeaderProps> = (props) => {
  const { title } = props;

  return (
    <div className="PageHeader">
      <div className="PageHeader__back" onClick={RouteHelper.goBack}>
        <LeftArrowIcon />
      </div>
      <span className="PageHeader__title">{title}</span>
    </div>
  );
};
