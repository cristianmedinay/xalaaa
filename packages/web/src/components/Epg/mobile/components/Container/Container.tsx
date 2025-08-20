/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { EpgContainerComponentProps, useEpgContent } from "@xala/common";
import React from "react";
import { useTranslation } from "react-i18next";

import { LoaderSpinner } from "components/LoaderSpinner";

import "./Container.scss";

export const Container = (props: EpgContainerComponentProps) => {
  const { children } = props;

  const { t } = useTranslation();
  const { isLoading, isEmpty } = useEpgContent();

  return (
    <div className="epg-mobile-container">
      {(isLoading || isEmpty) && (
        <div className="epg-mobile-container-loader">
          {isEmpty && !isLoading && <p>{t("MEDIA_LIST__EMPTY")}</p>}
          {isLoading && <LoaderSpinner width={40} height={40} />}
        </div>
      )}
      {isEmpty ? null : children}
    </div>
  );
};
