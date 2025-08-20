/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Dialog } from "..";
import { AddAssetForm } from "../../Forms/AddAssetForm/AddAssetForm";

import "./AddAssetDialog.scss";

export interface IAddAssetDialogProps {
  children: React.ReactNode;
  loading?: boolean;
}

export const AddAssetDialog: React.FC<IAddAssetDialogProps> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div onClick={isVisible ? undefined : openModal}>{children}</div>
      <Dialog
        wrapClassName="add-asset-dialog"
        destroyOnClose={true}
        footer={null}
        visible={isVisible}
        onCancel={closeModal}
      >
        <h1 className="text-upper text-center">
          {t("MEDIA_CREATOR__CREATE_EVENT__MODAL_TITLE", "Create new event")}
        </h1>

        <AddAssetForm onCloseDialog={closeModal} />
      </Dialog>
    </>
  );
};
