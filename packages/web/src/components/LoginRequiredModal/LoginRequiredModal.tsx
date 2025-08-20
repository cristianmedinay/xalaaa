/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { RouterState, ROUTES, useAnalyticsContext } from "@xala/common";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { MediaButtonVariant } from "enums";

import { Dialog, MediaButton } from "../../components";

import "./LoginRequiredModal.scss";

export interface ILoginRequiredModalProps {
  children: React.ReactNode | LoginRequiredModalChildren;
}

type LoginRequiredModalChildren = (props: {
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}) => React.ReactNode;

export const LoginRequiredModal: React.FC<ILoginRequiredModalProps> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();
  const { componentView } = useAnalyticsContext();

  const openModal = () => {
    setIsVisible(true);
    componentView();
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const toggleModal = () => {
    setIsVisible((oldVisibility) => !oldVisibility);
  };

  return (
    <>
      {typeof children === "function" ? (
        (children as LoginRequiredModalChildren)({
          openModal,
          closeModal,
          toggleModal,
        })
      ) : (
        <div onClick={isVisible ? undefined : openModal}>{children}</div>
      )}
      <Dialog
        wrapClassName="LoginRequiredModal"
        destroyOnClose={true}
        footer={null}
        visible={isVisible}
        onCancel={closeModal}
      >
        <span>{t("LOGIN_REQUIRED_MESSAGE")}</span>
        <Link
          to={{
            pathname: ROUTES.LOGIN,
            state: new RouterState(location.pathname + location.search),
          }}
        >
          <MediaButton type="button" variant={MediaButtonVariant.Primary}>
            {t("LOGIN_REQUIRED_ACTION")}
          </MediaButton>
        </Link>
      </Dialog>
    </>
  );
};
