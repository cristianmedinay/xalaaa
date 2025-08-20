/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import {
  ImageHelper,
  isRental,
  isSubscription,
  MediaStore,
  TimeHelper,
  useMediaByIdFromMediaListSelector,
} from "@xala/common";
import React, { useMemo, useState } from "react";

import icons from "../../../../resources/arrows";
import { ImageWithPlaceholder } from "../../../ImageWithPlaceholder";

import { ITableRowProps } from "./types";
import "./TableRow.scss";
import { ExpandedDetails } from "./ExpandedDetails";

import resources from "../../../../resources/list";

import { useTranslation } from "react-i18next";

export const TableRow = ({ purchase }: ITableRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const Media = useMediaByIdFromMediaListSelector(
    purchase.MediaId,
    MediaStore.Consts.MEDIA_LIST_SEARCH_KEY
  );
  const { t } = useTranslation();

  const frameImageUrl = useMemo(
    () => ImageHelper.getFrameImageUrl(Media?.Images),
    [Media]
  );

  const paymentType = useMemo<string>(() => {
    if (isSubscription(purchase)) {
      return t("MY_ORDERS__TYPE_SUBSCRIPTION");
    } else if (isRental(purchase)) {
      return t("MY_ORDERS__TYPE_RENTAL");
    } else {
      return t("MY_ORDERS__TYPE_ONETIME");
    }
  }, [purchase]);

  const paymentDate = useMemo(() => {
    if (isSubscription(purchase)) {
      return purchase.ValidFrom;
    } else if (isRental(purchase)) {
      return purchase.PaymentDate;
    } else {
      return purchase.PaymentDate;
    }
  }, [purchase]);

  return (
    <div className={`TableRow ${isExpanded ? "TableRow-expanded" : ""}`}>
      <div
        className="TableRow__BasicInfoContainer"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        {/* Dropdown icon */}
        <div className="TableRow__Column">
          <div>
            <img
              src={icons.arrowDown}
              alt="Arrow down"
              className={`TableRow__dropdown-icon ${
                isExpanded && "TableRow__dropdown-icon-expanded"
              }`}
            />
          </div>
        </div>
        {/* Frame Image */}
        <div className="TableRow__Column">
          <div className="TableRow__image-container">
            <ImageWithPlaceholder
              imageSrc={frameImageUrl}
              placeholderSrc={resources.framePlaceholder}
              imageContainerClassName="TableRow__image"
              alt={Media?.Title}
            />
          </div>
        </div>
        {/* Title */}
        <div className="TableRow__Column">
          <div className="Title">{purchase.MediaTitle}</div>
        </div>
        {/* Date */}
        <div className="TableRow__Column">
          {TimeHelper.format(paymentDate, "DD-MM-YYYY")}
        </div>
        {/* Payment type */}
        <div className="TableRow__Column">{paymentType}</div>
        {/* Status */}
        <div className="TableRow__Column">
          {purchase.Active
            ? t("MY_ORDERS__STATUS_ACTIVE")
            : t("MY_ORDERS__STATUS_INACTIVE")}
        </div>
      </div>
      {/*Additional expanded info*/}
      {isExpanded && <ExpandedDetails purchase={purchase} />}
    </div>
  );
};
