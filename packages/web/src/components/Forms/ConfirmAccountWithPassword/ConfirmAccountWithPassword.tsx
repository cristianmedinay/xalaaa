/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  ApiErrors,
  buildPasswordMatchRule,
  buildPasswordMinimumRule,
  buildPasswordPatternRule,
  buildRequiredRule,
  DeviceHelper,
  IConfirmAccountWithPasswordModel,
  IFormValues,
  IUserDeviceModel,
  updateApiErrors,
  UrlHelper,
  IAuthState,
} from "@xala/common";
import React from "react";
import { WithTranslation } from "react-i18next";
import { RouteComponentProps } from "react-router";

import { InputPassword } from "../..";
import { Form, FormButton, FormLine, LabelField } from "../../Form";
import { LoaderSpinner } from "../../LoaderSpinner";

interface IConfirmAccountWithPasswordProps
  extends RouteComponentProps,
    WithTranslation {
  onSubmit: (values: IConfirmAccountWithPasswordModel) => void;
  onValidate: (token: string) => void;
  authState: IAuthState;
}

interface IConfirmAccountWithPasswordState {
  isFormSent: boolean;
  hasErrors?: boolean;
  apiErrors: ApiErrors;
}

interface IConfirmAccountWithPasswordQueryParams {
  email?: string;
  token?: string;
}

export class ConfirmAccountWithPassword extends React.PureComponent<
  IConfirmAccountWithPasswordProps,
  IConfirmAccountWithPasswordState
> {
  _queryParams: IConfirmAccountWithPasswordQueryParams;
  _device: IUserDeviceModel | undefined = undefined;

  constructor(props: IConfirmAccountWithPasswordProps) {
    super(props);
    this._queryParams = UrlHelper.parse(
      this.props.location.search
    ) as IConfirmAccountWithPasswordQueryParams;
    this.state = {
      isFormSent: false,
      hasErrors: undefined,
      apiErrors: {},
    };
  }

  componentDidMount() {
    this.props.onValidate(this._queryParams.token || "");

    DeviceHelper.getDeviceInfo().then((device) => {
      this._device = device;
    });
  }

  private onFinish = (values: IFormValues) => {
    const payload: IConfirmAccountWithPasswordModel = {
      Email: this._queryParams.email || "",
      Token: this._queryParams.token || "",
      Password: values["password"],
      Device: this._device,
    };

    this.setState({ isFormSent: true });
    this.props.onSubmit(payload);
  };

  private onValuesChange = (changedValues: IFormValues) => {
    const { apiErrors } = this.state;
    const [isUpdated, newApiErrors] = updateApiErrors(apiErrors, changedValues);

    if (isUpdated) {
      this.setState({ isFormSent: false, apiErrors: newApiErrors });
    }
  };

  private renderForm() {
    const { t } = this.props;
    return (
      <Form onFinish={this.onFinish} onValuesChange={this.onValuesChange}>
        <h1 className="text-upper text-center">
          {t("CONFIRM_ACCOUNT_PASSWORD__TITLE")}
        </h1>
        <p className="text-center text-large">
          {t("CONFIRM_ACCOUNT_PASSWORD__SUBTITLE")}
        </p>
        <FormLine />

        <LabelField
          name="password"
          label={t("CONFIRM_ACCOUNT_PASSWORD__PASSWORD_LABEL")}
          rules={[
            buildRequiredRule(),
            buildPasswordMinimumRule(),
            buildPasswordPatternRule(),
          ]}
          apiErrors={this.state.apiErrors.Password || []}
        >
          <InputPassword className="FormInput" visibilityToggle={false} />
        </LabelField>

        <LabelField
          name="confirm_password"
          label={t("CONFIRM_ACCOUNT_PASSWORD__RE_PASSWORD_LABEL")}
          dependencies={["password"]}
          rules={[
            buildRequiredRule(),
            (context) => buildPasswordMatchRule(context, "password"),
          ]}
          apiErrors={this.state.apiErrors.confirm_password || []}
        >
          <InputPassword className="FormInput" visibilityToggle={false} />
        </LabelField>

        <div className="ButtonLine">
          <FormButton>{t("CONFIRM_EMAIL__SUBMIT", "Activate")}</FormButton>
        </div>
      </Form>
    );
  }

  private renderError() {
    const { t } = this.props;
    return (
      <div className="form">
        <h1 className="text-upper text-center">
          {t("RESET_PASSWORD__TOKEN_EXPIRED", "The token has expired")}
        </h1>
      </div>
    );
  }

  private renderLoader() {
    return (
      <div className="form" style={{ textAlign: "center" }}>
        <LoaderSpinner />
      </div>
    );
  }

  public render() {
    const { isTokenValid } = this.props.authState;

    return (
      <div className="ResetForgotPasswordForm AuthForm">
        {isTokenValid === undefined
          ? this.renderLoader()
          : isTokenValid
          ? this.renderForm()
          : this.renderError()}
      </div>
    );
  }
}
