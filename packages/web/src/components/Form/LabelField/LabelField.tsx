/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import cx from "classnames";
import { FieldProps } from "rc-field-form/es/Field";
import React, { useCallback, useState } from "react";

import { FieldChildrenProps, Form } from "../Form";

import "./LabelField.scss";

const { Field } = Form;

interface ErrorProps {
  children: React.ReactNode[];
}

const Error = ({ children }: ErrorProps) => (
  <ul className="Error">
    {children &&
      children.map((error, index: number) => <li key={index}>{error}</li>)}
  </ul>
);

interface ILabelFieldProps extends FieldProps {
  errorClass?: string;
  apiErrors?: string[];
  otherErrors?: string[];
  label?: React.ReactNode;
  tip?: React.ReactNode;
  requiredIcon?: boolean;
  displayLabel?: boolean;
  labelFor?: string;
}

const LabelFieldControl: React.FC<ILabelFieldProps & FieldChildrenProps> = ({
  children,
  control,
  meta,
  form,
  apiErrors,
  otherErrors,
  errorClass,
  label,
  tip,
  requiredIcon,
  displayLabel,
  labelFor,
}) => {
  const [visited, setVisited] = useState(control.touched);
  const [isActive, setIsActive] = useState<boolean>(false);
  const hasErrors = meta.errors.length > 0;
  const hasApiErrors = apiErrors && apiErrors.length > 0;
  const hasOtherErrors = otherErrors && otherErrors.length > 0;
  const displayError =
    !control.touched && (hasErrors || hasApiErrors || hasOtherErrors);

  const onBlur = useCallback(
    (...args) => {
      if (control.onBlur) {
        if (!visited) {
          setVisited(true);
        }

        control.onBlur(...args);
      }
    },
    [control, visited]
  );

  if (displayError) {
    control.className = errorClass;
  }
  if ((hasApiErrors || hasOtherErrors) && !hasErrors) {
    meta.errors = [
      ...meta.errors,
      ...(apiErrors || []),
      ...(otherErrors || []),
    ];
  }

  const childNode =
    typeof children === "function"
      ? children(control, meta, form)
      : React.cloneElement(children as React.ReactElement, {
          ...control,
          onBlur,
        });

  return (
    <div
      className={cx("LabelField", { LabelField__active: isActive })}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <div className="Label">
        <label
          style={!displayLabel ? { display: "none" } : {}}
          {...(labelFor ? { htmlFor: labelFor } : {})}
        >
          {label} {requiredIcon && <span className="required">*</span>}
        </label>
        <span>{tip}</span>
      </div>
      {childNode}
      {displayError && <Error>{meta.errors}</Error>}
    </div>
  );
};

const DEFAULT_VALIDATE_TRIGGER = ["onChange", "onBlur", "onSubmit"];

const LabelField: React.FunctionComponent<ILabelFieldProps> = ({
  name,
  label,
  tip,
  apiErrors,
  errorClass,
  otherErrors,
  children,
  requiredIcon,
  displayLabel = true,
  labelFor,
  ...restProps
}) => {
  return (
    <Field
      name={name}
      validateTrigger={DEFAULT_VALIDATE_TRIGGER}
      {...restProps}
    >
      {(control, meta, form) => (
        <LabelFieldControl
          control={control}
          meta={meta}
          form={form}
          label={label}
          tip={tip}
          apiErrors={apiErrors}
          otherErrors={otherErrors}
          errorClass={errorClass}
          requiredIcon={requiredIcon}
          displayLabel={displayLabel}
          labelFor={labelFor}
        >
          {children}
        </LabelFieldControl>
      )}
    </Field>
  );
};

LabelField.defaultProps = {
  errorClass: "FormInputError",
};

export { LabelField };
