/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import cx from "classnames";
import * as React from "react";

import XIcon from "../../resources/icons/x.svg";

import "./Input.scss";

export interface IInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  allowClear?: boolean;
  suffix?: React.ReactNode;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement>;
}

export function fixControlledValue<T>(value: T) {
  if (typeof value === "undefined" || value === null) {
    return "";
  }
  return value;
}

export function resolveOnChange(
  target: HTMLInputElement,
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.MouseEvent<HTMLElement, MouseEvent>,
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
) {
  if (onChange) {
    let event = e;
    if (e.type === "click") {
      // click clear icon
      event = Object.create(e);
      event.target = target;
      event.currentTarget = target;
      const originalInputValue = target.value;
      // change target ref value cause e.target.value should be '' when clear input
      target.value = "";
      onChange(event as React.ChangeEvent<HTMLInputElement>);
      // reset target ref value
      target.value = originalInputValue;
      return;
    }
    onChange(event as React.ChangeEvent<HTMLInputElement>);
  }
}

export interface IInputState {
  value: string | number | readonly string[] | undefined;
  focused: boolean;
  /** `value` from prev props */
  prevValue: string | number | readonly string[] | undefined;
}

export class Input extends React.Component<IInputProps, IInputState> {
  static defaultProps = {
    type: "text",
  };

  input!: HTMLInputElement;

  constructor(props: IInputProps) {
    super(props);
    const value =
      typeof props.value === "undefined" ? props.defaultValue : props.value;
    this.state = {
      value,
      focused: false,
      prevValue: props.value,
    };
  }

  static getDerivedStateFromProps(
    nextProps: IInputProps,
    { prevValue }: IInputState
  ) {
    const newState: Partial<IInputState> = { prevValue: nextProps.value };
    if (nextProps.value !== undefined || prevValue !== nextProps.value) {
      newState.value = nextProps.value;
    }
    return newState;
  }

  focus = () => {
    this.input.focus();
  };

  blur() {
    this.input.blur();
  }

  select() {
    this.input.select();
  }

  saveInput = (input: HTMLInputElement) => {
    this.input = input;
  };

  onFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const { onFocus } = this.props;
    this.setState({ focused: true });
    if (onFocus) {
      onFocus(e);
    }
  };

  onBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const { onBlur } = this.props;
    this.setState({ focused: false });
    if (onBlur) {
      onBlur(e);
    }
  };

  onInputMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // Prevent focused state lost
    e.preventDefault();
  };

  onInputMouseUp: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    this.focus();
  };

  setValue(value: string, callback?: () => void) {
    if (this.props.value === undefined) {
      this.setState({ value }, callback);
    }
  }

  handleReset = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.setValue("", () => {
      this.focus();
    });
    resolveOnChange(this.input, e, this.props.onChange);
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setValue(e.target.value);
    resolveOnChange(this.input, e, this.props.onChange);
  };

  handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { onPressEnter, onKeyDown } = this.props;
    if (e.keyCode === 13 && onPressEnter) {
      onPressEnter(e);
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  renderSuffixIcon() {
    const { allowClear, disabled, readOnly } = this.props;
    const { value } = this.state;
    const needClear = !disabled && !readOnly && value;

    if (allowClear && needClear) {
      return (
        <i
          className={cx("Input__clear", { "Input__clear--hidden": !needClear })}
          role="button"
          onClick={this.handleReset}
        >
          <XIcon />
        </i>
      );
    }

    return this.props.suffix;
  }

  renderSuffix() {
    const { suffix, allowClear } = this.props;

    if (suffix || allowClear) {
      return (
        <div
          className="Input__suffix"
          onMouseDown={this.onInputMouseDown}
          onMouseUp={this.onInputMouseUp}
        >
          {this.renderSuffixIcon()}
        </div>
      );
    }
    return null;
  }

  render() {
    const { className, ...otherProps } = this.props;
    const { focused, value } = this.state;
    const inputProps = { ...otherProps };
    delete inputProps.allowClear;
    delete inputProps.suffix;

    return (
      <span
        className={cx("Input", className, {
          "Input--focused": focused,
        })}
      >
        <input
          {...inputProps}
          ref={this.saveInput}
          className="Input__input"
          value={fixControlledValue(value)}
          onChange={this.handleChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyDown={this.handleKeyDown}
        />
        {this.renderSuffix()}
      </span>
    );
  }
}
