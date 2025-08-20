/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";
import { RouteComponentProps } from "react-router";

import { ConfirmEmail } from "../../../components/Forms";
import { AuthScreen, IAuthScreenProps } from "../AuthScreen";
import "../AuthScreen.scss";

interface IConfirmEmailScreenProps
  extends IAuthScreenProps,
    RouteComponentProps {}

export class ConfirmEmailScreen extends React.PureComponent<IConfirmEmailScreenProps> {
  render() {
    return (
      <AuthScreen {...this.props}>
        <ConfirmEmail {...this.props} />
      </AuthScreen>
    );
  }
}
