/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";

import { IListComponentHorizontalProps, ListComponentHorizontal } from "..";

export type IListComponentPromoProps = IListComponentHorizontalProps;

export const ListComponentPromo: React.FC<IListComponentPromoProps> =
  React.memo((props) => {
    return (
      <ListComponentHorizontal {...props} className="ListComponentPromo" />
    );
  });
