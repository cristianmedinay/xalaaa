/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { EpgContainerComponentProps, useEpgContent } from "@xala/common";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";

import { LoaderSpinner } from "components/LoaderSpinner";

import "./Container.scss";

interface ContainerProps extends EpgContainerComponentProps {
  timelineHeight: number;
}

const ContainerRaw = React.forwardRef<HTMLDivElement, ContainerProps>(
  (props, containerRef) => {
    const { timelineHeight, children } = props;

    const { t } = useTranslation();
    const { isLoading, isEmpty } = useEpgContent();

    return (
      <div
        className="epg-desktop-container"
        style={{
          width: "100%",
        }}
        ref={containerRef}
      >
        <div className="epg-desktop-container-wrapper">
          {!isEmpty && !isLoading && (
            <div
              className="epg-desktop-container-empty"
              style={{
                height: `${timelineHeight}px`,
              }}
            />
          )}
          {(isLoading || isEmpty) && (
            <div
              className="epg-desktop-container-loader"
              style={{ width: "100%", height: "100%" }}
            >
              {isEmpty && !isLoading && <p>{t("MEDIA_LIST__EMPTY")}</p>}
              {isLoading && <LoaderSpinner width={40} height={40} />}
            </div>
          )}
          {isEmpty ? null : children}
        </div>
      </div>
    );
  }
);

export const Container = memo(ContainerRaw);

ContainerRaw.displayName = "ContainerRaw";
Container.displayName = "Container";
