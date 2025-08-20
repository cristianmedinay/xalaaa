/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { TimeHelper } from "@xala/common";
import React from "react";

export interface ClockProps {
  className?: string;
  format: string;
  style: React.CSSProperties;
}

export interface ClockState {
  time: Date;
}

export class Clock extends React.Component<ClockProps, ClockState> {
  public state: Readonly<ClockState> = {
    time: new Date(),
  };

  public static defaultProps: ClockProps = {
    format: "HH:mm",
    style: {},
  };

  private _interval?: number;

  componentDidMount() {
    // Create the interval once component is mounted
    this._interval = window.setInterval(() => {
      this.setState({ time: new Date() });
    }, 10000); // every 10 seconds
  }

  componentWillUnmount() {
    // Delete the interval just before component is removed
    clearInterval(this._interval);
  }

  render() {
    const { className, format, style } = this.props;
    const { time } = this.state;

    return (
      <div className={className} style={style}>
        {TimeHelper.format(time, format)}
      </div>
    );
  }
}
