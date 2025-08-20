/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import * as React from "react";

interface Props {
  imageUrl: string;
  className?: string;
}

export const LogoTypeIcon = ({
  imageUrl,
  className = "LogoTypeIcon",
}: Props) => {
  const style: React.CSSProperties = {
    backgroundImage: `url("${imageUrl}")`,
    backgroundSize: "cover",
    width: "100px",
    height: "50px",
  };

  return <div className={className} style={style}></div>;
};
