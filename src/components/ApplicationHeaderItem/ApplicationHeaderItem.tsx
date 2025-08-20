/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IComponentModel } from "@xala/common";
import React from "react";

import "./ApplicationHeaderItem.scss";

export interface ApplicationHeaderItemProps {
  component: IComponentModel;
}

export const ApplicationHeaderItem = ({
  component,
}: ApplicationHeaderItemProps): JSX.Element => {
  if ("IconUrl" in component && "Action" in component)
    return (
      <button className="ApplicationHeaderItem">
        <img src={component.IconUrl} />
      </button>
    );

  return <></>;
};
