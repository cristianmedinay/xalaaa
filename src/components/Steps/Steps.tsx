/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import RcSteps from "rc-steps";
import { StepsProps as RcStepsProps } from "rc-steps/lib/Steps";
import React from "react";

import CheckIcon from "../../resources/icons/check.svg";
import XIcon from "../../resources/icons/x.svg";

import "./Steps.scss";

const icons = {
  finish: <CheckIcon />,
  error: <XIcon />,
};

export const Steps: React.FC<RcStepsProps> = (props) => {
  return <RcSteps {...props} icons={icons} />;
};
