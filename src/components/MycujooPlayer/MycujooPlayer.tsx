/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { Player } from "@mycujoo/mcls-components";
import React, { ReactNode } from "react";

import "./MycujooPlayer.scss";

interface IMycujooPlayerProps {
  autoplay: boolean;
  eventId: string;
  publicKey: string;
  onVideoPlay?: () => void;
  onVideoPause?: () => void;
  children?: ReactNode;
}

const MycujooPlayer = ({ children, ...props }: IMycujooPlayerProps) => {
  return <Player {...props}> {children} </Player>;
};

MycujooPlayer.displayName = "MycujooPlayer";

export default MycujooPlayer;
