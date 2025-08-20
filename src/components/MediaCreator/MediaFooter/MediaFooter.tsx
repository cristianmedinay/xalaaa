/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";
import { useTranslation } from "react-i18next";

import { FormLine, MediaButton } from "../..";

import "./MediaFooter.scss";

import { MediaButtonVariant } from "enums";

export interface ISummaryStepProps {
  goBack: () => void;
  goTo?: () => void;
  customNextTitle?: string;
  type: "button" | "submit" | "reset" | undefined;
}

export const MediaFooter = ({
  goBack,
  goTo = () => null,
  customNextTitle = "Next",
  type,
}: ISummaryStepProps) => {
  const { t } = useTranslation();

  return (
    <div className="media-footer-anchor">
      <div className="media-footer">
        <FormLine />
        <div className="form-actions">
          <MediaButton
            type="button"
            className="FormButton __previous"
            iconElevated
            variant={MediaButtonVariant.Primary}
            onClick={goBack}
          >
            {t("COMMON__BUTTON_PREVIOUS", "Previous")}
          </MediaButton>

          <MediaButton
            type={type}
            className="FormButton"
            iconElevated
            variant={MediaButtonVariant.Primary}
            onClick={goTo}
          >
            {t(
              `COMMON__BUTTON_PREVIOUS_${customNextTitle.toUpperCase()}`,
              customNextTitle
            )}
          </MediaButton>
        </div>
      </div>
    </div>
  );
};
