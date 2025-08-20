/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import {
  DataProvider,
  IAssetInAssetSearchResponseModel,
  IAssetListModel,
  IErrorModel,
  IFormValues,
  useDataLoader,
} from "@xala/common";
import { FormInstance } from "rc-field-form";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { LoaderSpinner, Message } from "components";
import { PillType } from "components/Pill";
import { PillsDialog } from "components/PillsDialog";
import { PillsList } from "components/PillsList";

interface IAssetSubscriptionsPillsProps {
  assetId?: number;
  form: FormInstance<IFormValues>;
}

export const AssetSubscriptionsPills = ({
  assetId = -1,
  form,
}: IAssetSubscriptionsPillsProps) => {
  const { t } = useTranslation();

  const { data: asset } = useDataLoader<IAssetListModel, IErrorModel>({
    loader: () =>
      DataProvider.searchAsset({
        FullTextSearch: "",
        IncludeCount: true,
        PageNumber: 1,
        PageSize: 15,
        Types: ["PACKAGE"],
        AssetId: assetId,
      })
        .then((response: IAssetListModel) => {
          return {
            ok: true,
            data: response,
            error: {},
          };
        })
        .catch((error) => {
          const { MessageKey } = error;

          if (Array.isArray(MessageKey)) {
            MessageKey.map((error) => Message.error(t(error)));
          } else {
            Message.error(t(MessageKey ?? "MODEL_VALIDATION_ERROR"));
          }

          return {
            ok: false,
            error: error,
          };
        }),
    deps: [],
  });

  const { data: assetByParent, loading } = useDataLoader<
    IAssetInAssetSearchResponseModel,
    IErrorModel
  >({
    loader: () =>
      DataProvider.searchAssetsInAssets({
        IncludeCount: true,
        PageNumber: 1,
        PageSize: 15,
        AssetId: assetId,
      })
        .then((response: IAssetInAssetSearchResponseModel) => ({
          ok: true,
          data: response,
          error: {},
        }))
        .catch((error) => {
          const { MessageKey } = error;

          if (Array.isArray(MessageKey)) {
            MessageKey.map((error) => Message.error(t(error)));
          } else {
            Message.error(t(MessageKey ?? "MODEL_VALIDATION_ERROR"));
          }

          return {
            ok: false,
            error: error,
          };
        }),
    deps: [],
  });

  const getPills = useMemo(
    () =>
      assetByParent?.Entities.filter(
        (entity) => entity.AssetParentTypeCode === "PACKAGE"
      ).map((entity) => ({
        title: entity.AssetParentTitle ?? "",
        id: entity.AssetParentId,
      })) ?? [],
    [assetByParent]
  );

  const dialogContent = (
    add: (...val: PillType[]) => void,
    closeModal: () => void
  ) => {
    const pillsList =
      asset?.Entities.map(
        ({ Title, Id }) => ({ title: Title, id: Id } as PillType)
      ) ?? [];

    const onDialogSubmit = (selectedItems: PillType[]) => {
      selectedItems.forEach((val) => add(val));
      closeModal();
    };

    return (
      <PillsDialog
        header={t(
          "MEDIA_CREATOR__CATCHUP__ADD_SUBSCRIPTIONS",
          "Choose subscription"
        )}
        onDialogSubmit={onDialogSubmit}
        pillsList={pillsList}
      />
    );
  };

  if (loading) return <LoaderSpinner width={20} height={20} />;
  return (
    <PillsList
      form={form}
      listName="subscription"
      label={t("MEDIA_CREATOR__CATCHUP__ADD_SUBSCRIPTIONS", "Subscription")}
      dialogContent={dialogContent}
      initialValue={getPills}
    />
  );
};
