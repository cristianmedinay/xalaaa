/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  buildEmailRule,
  buildRequiredRule,
  ComponentType,
  ConfigurationHelper,
  IConfigurationModel,
  ROUTES,
  ScreenType,
} from "@xala/common";
import React from "react";
import { WithTranslation } from "react-i18next";
import { Link, Redirect, RouteComponentProps } from "react-router-dom";

import {
  AppFooter,
  AppHeader,
  Form,
  FormLine,
  Input,
  LabelField,
  ListComponent,
  MediaButton,
  SMUp,
  XS,
} from "components";
import { MediaButtonVariant } from "enums";
import { BaseScreen } from "screens/BaseScreen";
import { BaseScreenCustomComponentRenderer } from "screens/BaseScreen/types";

import "./IntroScreen.scss";

interface IIntroScreenProps extends RouteComponentProps, WithTranslation {
  configuration?: IConfigurationModel;
}

export class IntroScreen extends React.PureComponent<IIntroScreenProps> {
  renderComponent: BaseScreenCustomComponentRenderer = (
    component,
    components,
    originalRenderer
  ) => {
    switch (component.ComponentTypeCode) {
      case ComponentType.List:
        return (
          <ListComponent
            key={component.Id}
            component={component}
            readOnly={true}
          />
        );
      default:
        return originalRenderer(component, components);
    }
  };

  render() {
    const { configuration, t } = this.props;

    const introScreen = ConfigurationHelper.getScreenByType(
      configuration,
      ScreenType.Intro
    );

    if (!Object.keys(introScreen).length) {
      return <Redirect to={ROUTES.HOME} />;
    }

    return (
      <div className="IntroScreen">
        <AppHeader configuration={configuration} />

        <section>
          <div className="IntroScreen__text text-center">
            <h1 className="IntroScreen__title">
              {t("WELCOME__TITLE", "Watch movies and TV shows")}
            </h1>

            <Form
              className="EmailForm"
              onFinish={(values) =>
                this.props.history.push({
                  pathname: ROUTES.REGISTER,
                  state: values,
                })
              }
            >
              <LabelField
                name="email"
                rules={[buildRequiredRule(), buildEmailRule()]}
                validateTrigger="onSubmit"
              >
                <Input
                  autoFocus
                  className="FormInput"
                  placeholder={t(
                    "COMMON__EMAIL_PLACEHOLDER",
                    "Enter Your E-Mail"
                  )}
                  suffix={
                    <SMUp>
                      <MediaButton variant={MediaButtonVariant.Primary}>
                        {t("COMMON__BUTTON_REGISTER", "Register")}
                      </MediaButton>
                    </SMUp>
                  }
                />
              </LabelField>

              <XS>
                <MediaButton variant={MediaButtonVariant.Primary}>
                  {t("COMMON__BUTTON_REGISTER", "Register")}
                </MediaButton>
              </XS>

              <Link
                className="text-normal text-link text-bold"
                to={ROUTES.HOME}
              >
                {t("WELCOME__CONTINUE", "Continue without account")}
              </Link>
            </Form>
          </div>

          <FormLine />
        </section>

        <BaseScreen renderComponent={this.renderComponent}>
          {({ renderScreen }) => renderScreen(introScreen)}
        </BaseScreen>
        <AppFooter />
      </div>
    );
  }
}
