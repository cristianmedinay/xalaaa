/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ITextWidgetComponentModel } from "@xala/common";
import React, { useMemo } from "react";

import "./TextWidget.scss";

import cx from "classnames";

interface ITextWidgetComponentProps {
  component: ITextWidgetComponentModel;
  isRenderedFirst: boolean;
}

export const TextWidget = (component: ITextWidgetComponentProps) => {
  const { ImageLink, Title, Content, FontColor, BackgroundColor } =
    component.component;
  const isRenderedFirst = component.isRenderedFirst;

  const TextWidgetClassName = cx("TextWidget", {
    TextWidget__WithImage: ImageLink,
    TextWidget__WithoutImage: !ImageLink,
  });

  const renderContent = useMemo(
    () => (
      <div
        className={
          ImageLink && isRenderedFirst
            ? `${TextWidgetClassName} isRenderedFirst`
            : `${TextWidgetClassName}`
        }
        style={{
          background: `Url(${ImageLink})`,
          backgroundColor: BackgroundColor,
        }}
      >
        <div className={`${TextWidgetClassName}-gradient`}></div>
        {Title && (
          <h1
            className={`${TextWidgetClassName}-header`}
            style={{ color: FontColor }}
          >
            {Title}
          </h1>
        )}
        <div
          dangerouslySetInnerHTML={{ __html: Content || "" }}
          className={`${TextWidgetClassName}-content`}
          style={{ color: FontColor }}
        ></div>
      </div>
    ),
    [ImageLink, Title, Content, FontColor, BackgroundColor, TextWidgetClassName]
  );

  return renderContent;
};
