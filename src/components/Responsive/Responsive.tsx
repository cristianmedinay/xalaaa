/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";
import { useMediaQuery } from "react-responsive";

export const Breakpoints = {
  XS: 500,
  SM: 800,
  MD: 1100,
  LG: 1400,
  XL: 1700,
};

export const MediaQuery = {
  XS: { maxWidth: Breakpoints.XS },
  SM: { minWidth: Breakpoints.XS, maxWidth: Breakpoints.SM },
  SMUp: { minWidth: Breakpoints.XS },
  MD: { minWidth: Breakpoints.SM, maxWidth: Breakpoints.MD },
  MDUp: { minWidth: Breakpoints.SM },
  LG: { minWidth: Breakpoints.MD, maxWidth: Breakpoints.LG },
  LGUp: { minWidth: Breakpoints.MD },
  XL: { minWidth: Breakpoints.LG },
};

export interface IResponsiveComponentProps {
  children: React.ReactNode;
}

export const XS = ({ children }: IResponsiveComponentProps) => {
  const isXS = useMediaQuery(MediaQuery.XS);
  return isXS ? <>{children}</> : null;
};

export const SM = ({ children }: IResponsiveComponentProps) => {
  const isSM = useMediaQuery(MediaQuery.SM);
  return isSM ? <>{children}</> : null;
};

export const SMUp = ({ children }: IResponsiveComponentProps) => {
  const isSMUp = useMediaQuery(MediaQuery.SMUp);
  return isSMUp ? <>{children}</> : null;
};

export const MD = ({ children }: IResponsiveComponentProps) => {
  const isMD = useMediaQuery(MediaQuery.MD);
  return isMD ? <>{children}</> : null;
};

export const MDUp = ({ children }: IResponsiveComponentProps) => {
  const isMDUp = useMediaQuery(MediaQuery.MDUp);
  return isMDUp ? <>{children}</> : null;
};

export const LG = ({ children }: IResponsiveComponentProps) => {
  const isLG = useMediaQuery(MediaQuery.LG);
  return isLG ? <>{children}</> : null;
};

export const LGUp = ({ children }: IResponsiveComponentProps) => {
  const isLGUp = useMediaQuery(MediaQuery.LGUp);
  return isLGUp ? <>{children}</> : null;
};

export const useBreakpoints = () => {
  const breakpoints = {
    isXS: useMediaQuery(MediaQuery.XS),
    isSM: useMediaQuery(MediaQuery.SM),
    isMD: useMediaQuery(MediaQuery.MD),
    isLG: useMediaQuery(MediaQuery.LG),
    isXL: useMediaQuery(MediaQuery.XL),
    breakpoint: "XS",
  };
  if (breakpoints.isXS) breakpoints.breakpoint = "XS";
  if (breakpoints.isSM) breakpoints.breakpoint = "SM";
  if (breakpoints.isMD) breakpoints.breakpoint = "MD";
  if (breakpoints.isLG) breakpoints.breakpoint = "LG";
  if (breakpoints.isXL) breakpoints.breakpoint = "XL";
  return breakpoints;
};
