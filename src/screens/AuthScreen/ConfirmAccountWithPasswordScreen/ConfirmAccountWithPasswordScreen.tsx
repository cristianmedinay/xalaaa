/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";
import { RouteComponentProps } from "react-router";

import { ConfirmAccountWithPassword } from "../../../components/Forms/ConfirmAccountWithPassword";
import { AuthScreen, IAuthScreenProps } from "../AuthScreen";
import "../AuthScreen.scss";

interface IConfirmAccountWithPasswordScreenProps
  extends IAuthScreenProps,
    RouteComponentProps {}

export class ConfirmAccountWithPasswordScreen extends React.PureComponent<IConfirmAccountWithPasswordScreenProps> {
  render() {
    return (
      <AuthScreen {...this.props}>
        <ConfirmAccountWithPassword {...this.props} />
      </AuthScreen>
    );
  }
}
