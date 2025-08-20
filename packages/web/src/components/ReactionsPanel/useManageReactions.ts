/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { useInterval } from "@xala/common";
import { useState } from "react";
import { unstable_batchedUpdates } from "react-dom";

import { ReactionType } from "../Reaction/types";

import { EXPIRATION_DELAY } from "./consts";

type ReactionViewModel = {
  top: number;
  left: number;
  type: ReactionType;
  expiration: number;
};

type PendingReactionViewModel = Omit<ReactionViewModel, "expiration">;

export const useManageReactions = () => {
  const [visibleReactions, setVisibleReactions] = useState<ReactionViewModel[]>(
    []
  );
  const [pendingReactions, setPendingReactions] = useState<
    PendingReactionViewModel[]
  >([]);

  const addImmediate = (reaction: PendingReactionViewModel) =>
    setVisibleReactions((list) => [
      ...list,
      { ...reaction, expiration: new Date().getTime() + EXPIRATION_DELAY },
    ]);

  const addPending = (reactions: PendingReactionViewModel[]) =>
    setPendingReactions((list) => [...list, ...reactions]);

  useInterval(
    () => {
      unstable_batchedUpdates(() => {
        const scheduledReaction = pendingReactions[0];
        addImmediate(scheduledReaction);
        setPendingReactions(([, ...list]) => list);
      });
    },
    pendingReactions.length ? 100 : null
  );

  useInterval(
    () => {
      const now = new Date().getTime();
      setVisibleReactions((list) =>
        list.filter(({ expiration }) => expiration > now)
      );
    },
    visibleReactions.length ? 3000 : null
  );

  return [visibleReactions, { addImmediate, addPending }] as const;
};
