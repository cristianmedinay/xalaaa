/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";

import { IListComponentHorizontalProps, ListComponentHorizontal } from "..";

import "./ListComponentHighlight.scss";

export type IListComponentHighlightProps = IListComponentHorizontalProps;

export const ListComponentHighlight: React.FC<IListComponentHighlightProps> =
  React.memo((props) => {
    return (
      <ListComponentHorizontal {...props} className="ListComponentHighlight" />
    );
  });
