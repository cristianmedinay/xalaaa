/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  ApiErrors,
  buildEmailRule,
  buildNameMaxLengthRule,
  buildPasswordEmailMatchRule,
  buildPasswordMatchRule,
  buildPasswordMinimumRule,
  buildPasswordPatternRule,
  buildRequiredRule,
  IAppState,
  IFormValues,
  IUserConsentModel,
  ROUTES,
} from "@xala/common";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  Checkbox,
  Consent,
  Form,
  FormButton,
  FormLine,
  Input,
  InputPassword,
  LabelField,
  SeparateDatePicker,
} from "components";

interface IRegisterFormProps {
  initialValues?: IFormValues;
  onSubmit: (data: IFormValues) => void;
  handleValuesChange: (changedValues: IFormValues) => void;
  apiErrors: ApiErrors;
  initialConsents: consentsStatesType;
}

type consentsStatesType = { [id: string]: boolean };

export const RegisterStepOneForm = ({
  initialValues,
  onSubmit,
  handleValuesChange,
  apiErrors,
  initialConsents,
}: IRegisterFormProps) => {
  const { t } = useTranslation();
  const [consentsStates, setConsentsStates] =
    useState<consentsStatesType>(initialConsents);
  const userConsents = useSelector<IAppState, IUserConsentModel[] | undefined>(
    (state) => state.user.consents.Data,
    shallowEqual
  );

  useEffect(() => {
    if (userConsents && Object.keys(consentsStates).length === 0) {
      setConsentsStates(
        Object.assign(
          {},
          ...userConsents
            .filter((consent) => consent.ConsentRequired)
            .map((consent) => ({ [`${consent.ConsentId}`]: false }))
        )
      );
    }
  }, [userConsents]);

  const allConsentsAccepted = useMemo(
    () => Object.values(consentsStates).every((state) => state),
    [consentsStates]
  );

  const handleCheckboxChange = (event: Event) => {
    const {
      target: { id, checked },
    } = event as unknown as React.ChangeEvent<HTMLInputElement>;
    const newStates = { ...consentsStates };
    newStates[id] = checked;
    setConsentsStates(newStates);
  };

  const renderConsents = () => {
    const requiredConsents = userConsents?.filter(
      ({ ConsentRequired }) => ConsentRequired
    );

    return requiredConsents?.map((consent) => (
      <div className="RegisterConsents__Option" key={consent.ConsentId}>
        <label>
          <Checkbox
            id={`${consent.ConsentId}`}
            onChange={handleCheckboxChange}
            checked={consentsStates[consent.ConsentId] ?? false}
          />

          <span className="RegisterConsents__Option__Description">
            <Consent consent={consent} />
          </span>
        </label>
      </div>
    ));
  };

  return (
    <Form
      className="RegisterForm__form RegisterForm__container"
      initialValues={initialValues}
      onFinish={onSubmit}
      onValuesChange={handleValuesChange}
    >
      <LabelField
        name="name"
        label={t("REGISTER__NAME_LABEL") + " *"}
        labelFor="name"
        rules={[buildRequiredRule(), buildNameMaxLengthRule()]}
        apiErrors={apiErrors.Name || []}
      >
        <Input
          className="RegisterForm__input FormInput"
          autoFocus={true}
          id="name"
        />
      </LabelField>

      <LabelField
        name="surname"
        label={t("REGISTER__SURNAME_LABEL") + " *"}
        labelFor="surname"
        rules={[buildRequiredRule(), buildNameMaxLengthRule()]}
        apiErrors={apiErrors.Surname || []}
      >
        <Input className="RegisterForm__input FormInput" id="surname" />
      </LabelField>

      <LabelField
        name="email"
        label={t("REGISTER__EMAIL_LABEL") + " *"}
        labelFor="email"
        rules={[buildRequiredRule(), buildEmailRule()]}
        apiErrors={apiErrors.Email || []}
      >
        <Input
          className="RegisterForm__input FormInput"
          type="email"
          id="email"
        />
      </LabelField>

      <div className="RegisterForm__input">
        <SeparateDatePicker />
      </div>

      <LabelField
        name="password"
        label={t("REGISTER__PASSWORD_LABEL")}
        displayLabel={false}
        labelFor="password"
        rules={[
          buildRequiredRule(),
          buildPasswordMinimumRule(),
          buildPasswordPatternRule(),
          (context) => buildPasswordEmailMatchRule(context, "email"),
        ]}
        apiErrors={apiErrors.Password || []}
      >
        <InputPassword
          className="RegisterForm__input FormInput"
          visibilityToggle={false}
          placeholder={t("REGISTER__PASSWORD_LABEL") + " *"}
          autoComplete="new-password"
          id="password"
        />
      </LabelField>

      <LabelField
        name="confirm_password"
        dependencies={["password"]}
        label={t("REGISTER__CONFIRM_PASSWORD_LABEL")}
        displayLabel={false}
        labelFor="confirm_password"
        rules={[
          buildRequiredRule(),
          (context) => buildPasswordMatchRule(context, "password"),
        ]}
      >
        <InputPassword
          className="RegisterForm__input FormInput"
          visibilityToggle={false}
          placeholder={t("REGISTER__CONFIRM_PASSWORD_LABEL") + " *"}
          autoComplete="off"
          id="confirm_password"
        />
      </LabelField>

      <div className="RegisterForm__consents">{renderConsents()}</div>
      <div className="Error">{apiErrors.Message}</div>

      <div className="ButtonLine">
        <FormButton disabled={!allConsentsAccepted}>
          {t("REGISTER__CONTINUE")}
        </FormButton>
      </div>

      <FormLine style={{ margin: "160px 0 58px" }} />

      <h2 className="RegisterForm__title RegisterForm__title--second">
        {t("REGISTER__ALREADY_REGISTERED")}
      </h2>

      <Link to={ROUTES.LOGIN}>
        <button className="RegisterForm__button RegisterForm__button--transparent TransparentButton">
          {t("COMMON__BUTTON_LOGIN")}
        </button>
      </Link>
    </Form>
  );
};
