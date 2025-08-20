/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";

import "./FormLine.scss";

interface IFormLineProps {
  style?: React.CSSProperties;
}

export const FormLine: React.FC<IFormLineProps> = ({ style }) => {
  return <div className="FormLine" style={style}></div>;
};
