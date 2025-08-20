/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IErrorModel } from "@xala/common";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { MediaButtonVariant } from "enums";

import { Dialog, LoaderSpinner, MediaButton } from "..";

import "./ConsentModal.scss";

interface IConsentModalProps {
  refresh?: () => void;
  error?: IErrorModel;
}

export const ConsentModal = ({ refresh, error }: IConsentModalProps) => {
  const { t } = useTranslation();
  const [reload, setReload] = useState(false);

  const handleRefresh = () => {
    setReload(true);
    refresh && refresh();
  };
  useEffect(() => {
    const timerForReload = setTimeout(() => {
      setReload(false);
    }, 1000);
    return () => {
      clearTimeout(timerForReload);
    };
  }, [reload]);

  return (
    <>
      <Dialog wrapClassName="ConsentModal" destroyOnClose footer={null} visible>
        <span>{t("CONNECTION_ERROR_INFO_TITLE")}</span>
        {error && (
          <span className="ErrorMessage">
            {t(`${error.MessageKey}`, error.Message)}
          </span>
        )}
        <div className="ConsentModal__Buttons">
          <MediaButton
            variant={MediaButtonVariant.Primary}
            onClick={handleRefresh}
          >
            {reload ? (
              <LoaderSpinner height={30} width={30} />
            ) : (
              t("CONNECTION_ERROR_INFO_BUTTON")
            )}
          </MediaButton>
        </div>
      </Dialog>
    </>
  );
};
