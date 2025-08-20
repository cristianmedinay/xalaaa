/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React, { useEffect, useLayoutEffect } from "react";

import "./ReactionBubble.scss";

import reactions from "../../resources/reactions";
import { ReactionType } from "../Reaction/types";

import { useRef } from "react";

export interface IReactionsProps {
  type: ReactionType;
  greyed?: boolean;
  top: number;
  left: number;
}

export const ReactionBubble: React.FC<IReactionsProps> = React.memo(
  ({ type, top, left }) => {
    const reactionBubbleRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      document.documentElement.style.setProperty(
        "--reaction-populate-matrix-1",
        `matrix(2, 0, 0, 2, 0, -${top - 150})`
      );
      document.documentElement.style.setProperty(
        "--reaction-populate-matrix-2",
        `matrix(6, 0, 0, 6, 0, -${top - 150})`
      );
    });

    useEffect(() => {
      if (reactionBubbleRef.current) {
        reactionBubbleRef.current.style.left = "";
        reactionBubbleRef.current.style.opacity = "1";
      }
    }, []);

    return (
      <div
        ref={reactionBubbleRef}
        className="reaction__bubble"
        style={{ top: `${top}px`, left: `${left}px` }}
      >
        <img src={reactions[type]} />
      </div>
    );
  }
);
