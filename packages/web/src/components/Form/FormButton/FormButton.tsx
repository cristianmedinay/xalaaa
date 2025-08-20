/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";

import { MediaButtonVariant } from "enums";

import { MediaButton } from "../..";
import { Form } from "../Form";

import "./FormButton.scss";

const { Field } = Form;

interface IFormButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  loading?: boolean;
}

export const FormButton: React.FC<IFormButtonProps> = ({
  type,
  disabled,
  loading,
  children,
}) => {
  return (
    <Field shouldUpdate={true}>
      {(control, meta, form) => {
        const hasErrors = !!form
          .getFieldsError()
          .filter(({ errors }) => errors.length).length;

        return (
          <MediaButton
            className="FormButton"
            disabled={hasErrors || disabled}
            type={type}
            variant={
              disabled
                ? MediaButtonVariant.Disabled
                : MediaButtonVariant.Primary
            }
            loading={loading}
          >
            {children}
          </MediaButton>
        );
      }}
    </Field>
  );
};

FormButton.defaultProps = {
  type: "submit",
};
