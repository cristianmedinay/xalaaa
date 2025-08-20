/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React, { useState } from "react";

import { AGGREGATION_WINDOW_WIDTH, REACTION_TYPES } from "./consts";
import "./ReactionsPanel.scss";

import { Reaction } from "../Reaction";
import { ReactionType } from "../Reaction/types";
import { ReactionBubble } from "../ReactionBubble";

import { useEffect } from "react";
import {
  countOccurrences,
  formatWithMultiplierSuffix,
  pickTopOccurrence,
  useDebouncedState,
  useIdle,
  useTimeWindowAggregator,
} from "@xala/common";

import { useManageReactions } from "./useManageReactions";

export interface IReactionsPanelProps {
  percentage?: number;
  onClick?: () => void;
}

const getRandomReactionType = () =>
  REACTION_TYPES[Math.floor(Math.random() * REACTION_TYPES.length)];

const TemporaryExternalControlPanel = ({ addPending }: any) => {
  const [fakeExternal, setFakeExternal] = useState(false);

  const addExternalReaction = (type: ReactionType) =>
    addPending([
      {
        left: window.innerWidth - 100,
        top: window.innerHeight - 50,
        type,
      },
    ]);

  useEffect(() => {
    if (fakeExternal) {
      const timeoutRef = { handle: 0 };
      const addReactionAfterTimeout = () => {
        // @ts-ignore
        timeoutRef.handle = setTimeout(() => {
          addExternalReaction(getRandomReactionType());
          addReactionAfterTimeout();
        }, 50 + (Math.floor(new Date().getTime() / 1000) % 10) * 100 * Math.random());
      };
      addReactionAfterTimeout();
      return () => clearTimeout(timeoutRef.handle);
    }
  }, [fakeExternal]);

  return (
    <div style={{ position: "absolute", top: 0, left: 0 }}>
      {REACTION_TYPES.map((type) => (
        <button key={type} onClick={() => addExternalReaction(type)}>
          {type}
        </button>
      ))}
      <button onClick={() => setFakeExternal((v) => !v)}>
        {fakeExternal ? "DISABLE" : "ENABLE"} EXTERNAL STREAM
      </button>
    </div>
  );
};

export const ReactionsPanel = ({ onClick }: IReactionsPanelProps) => {
  const [reactions, { addImmediate, addPending }] = useManageReactions();

  const idle = useIdle(3000);

  const mounted = useDebouncedState(!idle, (mount) => (mount ? 0 : 1000));

  const pushReactionToAggregator = useTimeWindowAggregator<ReactionType>(
    (reactions) => {
      const topReaction = pickTopOccurrence(countOccurrences(reactions));
      if (topReaction) {
        console.log("TOP REACTION", topReaction);
      }
    },
    AGGREGATION_WINDOW_WIDTH
  );

  const [hover, setHover] = useState<ReactionType | undefined>(undefined);

  return (
    <>
      <TemporaryExternalControlPanel addPending={addPending} />
      {reactions.map(({ type, left, top, expiration }) => (
        <ReactionBubble type={type} left={left} top={top} key={expiration} />
      ))}
      {mounted && (
        <div
          className="reactions__panel"
          style={{ opacity: idle ? 0 : 1 }}
          onClick={onClick}
        >
          {REACTION_TYPES.map((type) => (
            <div className="reactions__panel__item" key={type}>
              <Reaction
                type={type}
                onHover={(mouseMover) =>
                  setHover(mouseMover ? type : undefined)
                }
                onClick={(e) => {
                  const { top, left, width } =
                    e.currentTarget.getBoundingClientRect();
                  pushReactionToAggregator(type);
                  addImmediate({ type, left: left + width / 2, top });
                }}
              />
              <span
                className="reactions__panel__count"
                style={{ opacity: hover === type ? 0 : 1 }}
              >
                {formatWithMultiplierSuffix(Math.random() * 200000)}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
