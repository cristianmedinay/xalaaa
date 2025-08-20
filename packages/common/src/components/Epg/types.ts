/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  EpgConfigurationProviderProps,
  EpgContentProviderProps,
  EpgDayProviderProps,
} from "./context";

export type ChannelId = number | string;
export type ProgramId = number | string;

export interface EpgChannel {
  id: ChannelId;
  title: string;
  logo?: string;
  index: number;
}

export interface EpgProgram {
  id: ProgramId;
  channelId: ChannelId;
  title: string;
  since: string;
  till: string;
}

export type TimelineVerticalPosition = {
  top: number;
  height: number;
};

export type TimelineHorizontalPosition = {
  left: number;
  width: number;
};

export type TimelineProgramPosition = TimelineVerticalPosition &
  TimelineHorizontalPosition & {
    edgeEnd: number;
  };

export interface TimelineChannel {
  channel: EpgChannel;
  position: TimelineVerticalPosition;
}

export interface TimelineProgram {
  program: EpgProgram;
  position: TimelineProgramPosition;
}

export type EpgProps = EpgConfigurationProviderProps &
  EpgDayProviderProps &
  EpgContentProviderProps;

export interface EpgChannelComponentProps {
  channel: TimelineChannel;
}

export interface EpgContainerComponentProps {
  children: React.ReactNode;
}
