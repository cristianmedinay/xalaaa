/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import moment from "moment";
import TimePicker from "rc-time-picker";
import React, { useEffect } from "react";

import TimeIcon from "../../resources/icons/clock-icon.svg";

import "./TimePickerField.scss";

export interface ITimePickerFieldProps {
  onChange?: (value: moment.Moment) => void;
  defaultValue: any;
}
export const TimePickerField: React.FC<ITimePickerFieldProps> = (props) => {
  const [time, setTime] = React.useState<moment.Moment | undefined>(
    props.defaultValue && moment(props.defaultValue)
  );

  useEffect(() => {
    setTime(props.defaultValue && moment(props.defaultValue));
  }, [props.defaultValue]);

  const handleOnChange = (newValue: moment.Moment) => {
    setTime(newValue);
    props.onChange?.(newValue);
  };
  return (
    <div className="time-picker">
      <TimePicker
        value={time}
        onChange={handleOnChange}
        placement="topLeft"
        placeholder="Select Time"
      />
      <TimeIcon />
    </div>
  );
};
