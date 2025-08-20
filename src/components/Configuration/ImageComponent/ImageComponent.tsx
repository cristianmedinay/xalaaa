/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IImageComponentModel } from "@xala/common";
import React from "react";

export interface IImageComponentProps {
  component: IImageComponentModel;
}

export class ImageComponent extends React.Component<IImageComponentProps> {
  render() {
    const { component } = this.props;

    return (
      <div style={{ flex: 1 }}>
        <img src={component.BackgroundUrl} style={styles.image} />
      </div>
    );
  }
}

const styles = {
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
};
