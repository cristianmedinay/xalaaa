/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import * as React from "react";

import "./ImageOverlay.scss";

export interface ImageOverlayProps {
  src?: string;
  imageStyle?: React.CSSProperties;
}

export const ImageOverlay = ({ src, imageStyle }: ImageOverlayProps) => {
  imageStyle = {
    ...imageStyle,
    backgroundImage: `url(${src})`,
  };

  return (
    <div className="ImageOverlay-container">
      {src ? (
        <div className="ImageOverlay-image" style={imageStyle} />
      ) : (
        <div className="ImageOverlay-overlay" />
      )}
    </div>
  );
};
