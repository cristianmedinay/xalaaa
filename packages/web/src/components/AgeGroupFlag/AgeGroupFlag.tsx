/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import * as React from "react";

import ageGroupsImages from "../../resources/ageGroups";

interface Props {
  ageGroup?: "7" | "12" | "16" | "18";
}

export const AgeGroupFlag = (props: Props) => {
  const { ageGroup = 7 } = props;
  const src = ageGroup ? ageGroupsImages[ageGroup] : "";

  return <img src={src} className="ageGroupFlag"></img>;
};
