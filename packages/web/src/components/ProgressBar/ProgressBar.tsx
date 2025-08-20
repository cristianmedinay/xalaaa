/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ThemeContext } from "@xala/common";
import * as React from "react";

import "./ProgressBar.scss";

export interface ProgressBarProps {
  currentOverlayImage?: string;
  progress: number;
}

export interface ProgressBarState {
  animationProgress: number;
  mounted?: boolean;
}

export class ProgressBar extends React.PureComponent<
  ProgressBarProps,
  ProgressBarState
> {
  static contextType = ThemeContext;

  state: Readonly<ProgressBarState> = {
    animationProgress: 0,
  };

  public componentDidMount() {
    this.setState(() => ({ animationProgress: this.props.progress }));
  }

  public render() {
    const { animationProgress } = this.state;

    const themeProvider = this.context.themeProvider;

    const progressBarContainerStyle: React.CSSProperties = {
      backgroundColor: themeProvider.getColor("AppPrimaryTextColor"),
    };
    const progressBarStyle: React.CSSProperties = {
      backgroundColor: themeProvider.getColor("AppPrimaryColor"),
      width: `${animationProgress}%`,
    };
    return (
      <div className="ProgressBar-container" style={progressBarContainerStyle}>
        <div className="ProgressBar-bar" style={progressBarStyle} />
      </div>
    );
  }
}
