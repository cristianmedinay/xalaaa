/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IComponentModel } from "@xala/common";
import React from "react";

import { ApplicationHeaderItem } from "../ApplicationHeaderItem";

export interface IApplicationHeaderProps {
  items?: IComponentModel[];
}

export const ApplicationHeader = ({ items }: IApplicationHeaderProps) => (
  <>
    {items
      ?.filter((component: IComponentModel) => component.IsVisible)
      .map((component: IComponentModel) => (
        <ApplicationHeaderItem key={component.Id} component={component} />
      ))}
  </>
);
