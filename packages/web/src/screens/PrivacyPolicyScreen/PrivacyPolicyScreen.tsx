/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ScreenType, UserStore } from "@xala/common";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

import { InfoDetailsScreen } from "../InfoDetailsScreen";

export interface IPrivacyPolicyScreenParams {
  id: string;
}
export const PrivacyPolicyScreen = () => {
  const params = useParams<IPrivacyPolicyScreenParams>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserStore.Actions.getUserConsents());
  }, [dispatch]);

  return (
    <InfoDetailsScreen
      screenTypeCode={ScreenType.PrivacyPolicy}
      isConsent
      textCode={params.id}
    />
  );
};
