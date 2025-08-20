/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";

import { IListComponentHorizontalProps, ListComponentHorizontal } from "..";

export const ListComponentLandscape: React.FC<IListComponentHorizontalProps> =
  React.memo((props) => {
    return (
      <ListComponentHorizontal {...props} className="ListComponentLandscape" />
    );
  });
