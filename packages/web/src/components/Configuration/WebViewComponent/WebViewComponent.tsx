/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IWebViewComponentModel } from "@xala/common";
import React from "react";

export interface IWebViewComponentProps {
  component: IWebViewComponentModel;
}

export class WebViewComponent extends React.Component<IWebViewComponentProps> {
  render() {
    const { component } = this.props;

    return (
      <div
        id="iframe-container"
        style={{
          width: "100%",
          height: "100%",
          overflowY: "hidden",
        }}
      >
        <iframe
          id={`${component.Id}`}
          frameBorder="0"
          src={component.Url}
          width="100%"
          height="100%"
          style={{
            width: "100%",
            height: "100%",
            minHeight: "1024px",
          }}
        ></iframe>
      </div>
    );
  }
}
