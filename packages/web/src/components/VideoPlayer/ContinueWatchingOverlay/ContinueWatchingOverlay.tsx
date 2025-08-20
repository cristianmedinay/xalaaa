/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";
import { WithTranslation } from "react-i18next";

import "./ContinueWatchingOverlay.scss";

import PlayIcon from "../../../resources/icons/play.svg";
import ReplayIcon from "../../../resources/icons/replay.svg";
import { MediaButton } from "../../MediaButton";

import { MediaButtonVariant } from "enums";

interface Props extends WithTranslation {
  isVisible: boolean;
  imageUrl?: string;
  /**
   * If timeout is `undefined`, overlay will be displayed until user choose option.
   */
  timeoutInSeconds?: number;
  onPositiveClick?: () => void;
  onNegativeClick?: () => void;
}

interface State {
  timeLeftInSeconds: number;
}

export class ContinueWatchingOverlay extends React.PureComponent<Props, State> {
  private intervalId = -1;

  constructor(props: Props) {
    super(props);
    this.state = {
      timeLeftInSeconds: props.timeoutInSeconds ?? -1,
    };
    this.startTimer = this.startTimer.bind(this);
    this.tickTimeout = this.tickTimeout.bind(this);
    this.onNegativeClick = this.onNegativeClick.bind(this);
    this.onPositiveClick = this.onPositiveClick.bind(this);
  }

  private tickTimeout() {
    const { timeLeftInSeconds } = this.state;
    if (timeLeftInSeconds <= 0) {
      this.stopTimer();
      this.onPositiveClick();
    } else {
      this.setState({
        timeLeftInSeconds: timeLeftInSeconds - 1,
      });
    }
  }

  private isTimerRunning() {
    return this.intervalId != -1;
  }

  private startTimer() {
    // @ts-ignore
    this.intervalId = setInterval(this.tickTimeout, 1000);
  }

  private stopTimer() {
    clearInterval(this.intervalId);
    this.intervalId = -1;
  }

  private onPositiveClick() {
    this.stopTimer();
    if (this.props.onPositiveClick) {
      this.props.onPositiveClick();
    }
  }

  private onNegativeClick() {
    this.stopTimer();
    if (this.props.onNegativeClick) {
      this.props.onNegativeClick();
    }
  }

  componentDidMount() {
    if (!this.isTimerRunning() && this.props.timeoutInSeconds) {
      this.startTimer();
    }
  }

  render() {
    const { isVisible, imageUrl, t } = this.props;

    const isTimeoutSet = this.props.timeoutInSeconds != undefined;

    return isVisible ? (
      <div className={"ContinueWatchingOverlay"}>
        <div className={"ContinueWatchingOverlay__Popup"}>
          <img className={"ContinueWatchingOverlay__Image"} src={imageUrl} />
          <div className={"ContinueWatchingOverlay__Footer"}>
            <MediaButton
              onClick={this.onNegativeClick}
              icon={<PlayIcon />}
              iconElevated
              variant={MediaButtonVariant.Primary}
            >
              {t("WATCH__START_FROM_BEGGINING", "Start from beginning")}
            </MediaButton>
            <MediaButton
              onClick={this.onPositiveClick}
              icon={isTimeoutSet ? "" : <ReplayIcon />}
              iconElevated
              variant={MediaButtonVariant.Primary}
            >
              {isTimeoutSet && `(${this.state.timeLeftInSeconds}s) `}
              {t("WATCH__CONTINUE_WATCHING", "Continue watching")}
            </MediaButton>
          </div>
        </div>
      </div>
    ) : null;
  }
}
