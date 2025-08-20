/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";

import StarIcon from "../../resources/icons/star.svg";

import "./Rating.scss";

export interface RatingProps {}

export const Rating: React.FC<RatingProps> = () => {
  return (
    <div className="Rating">
      {[...Array(5).keys()].map((key: number) => (
        <StarIcon key={key} />
      ))}
    </div>
  );
};
