/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";

export const RenderMailLink = ({ children }: { children?: string[] }) => {
  const mailAdress = children?.toString();

  if (!mailAdress) {
    return <></>;
  }

  return (
    <a href={`mailto:${mailAdress}`} className="text-link text-underline">
      {mailAdress}
    </a>
  );
};
