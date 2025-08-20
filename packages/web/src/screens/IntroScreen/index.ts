/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAppState } from "@xala/common";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import { IntroScreen as IntroScreenDefinition } from "./IntroScreen";

const mapStateToProps = (state: IAppState) => {
  return {
    configuration: state.configuration.configuration,
  };
};

export const IntroScreen = connect(mapStateToProps)(
  withTranslation()(IntroScreenDefinition)
);
