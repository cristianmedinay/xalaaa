/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import * as React from "react";
import isEqual from "react-fast-compare";
import { InView } from "react-intersection-observer";

import { LoaderSpinner } from "../LoaderSpinner";

import "./ImageWithRatio.scss";

export interface Props {
  imageSrc?: string; // source for the image which will be rendered once it is loaded
  isSpinner?: boolean;
  className?: string;
  contentClassName?: string;
  width?: number | string | null;
  height?: number | string | null;
  onClick?: () => void;
  onResize?: (width: number, height: number) => void;
  hasGradient?: boolean;
}

export interface State {
  hasBeenLoaded?: string; // flag that indicates whether or not image has been loaded
  width: number | string;
  height: number | string;
}

/*
 * Component which will display given image based od imageSrc. Until image is not loaded (ready to be rendered)
 * a placeholder image will be rendered
 */
export class ImageWithRatio extends React.Component<Props, State> {
  private _imageLoader: HTMLImageElement = new Image();
  private _mounted = false;

  public state = {
    hasBeenLoaded: "",
    width: "100%",
    height: "100%",
  };

  private getContainerStyle = () => {
    let width: string | number = -1;

    if (this.props.width === null) {
      width = -1;
    } else if (this.props.width) {
      width = this.props.width;
    } else {
      width = this.state.width;
    }

    let height: string | number = -1;

    if (this.props.height === null) {
      height = -1;
    } else if (this.props.height) {
      height = this.props.height;
    } else {
      height = this.state.height;
    }

    const style: React.CSSProperties = {};
    if (width !== -1) {
      style.width = width;
    }

    if (height !== -1) {
      style.height = height;
    }
    return style;
  };

  private getRatioStyle = () => {
    const { imageSrc } = this.props;
    const ratioStyle: React.CSSProperties = {};

    const { hasGradient = false } = this.props;
    if (hasGradient) {
      ratioStyle.backgroundImage = `linear-gradient(to bottom, transparent, black 90%)`;

      if (imageSrc) {
        ratioStyle.backgroundImage += `, url(${this.props.imageSrc})`;
      }
    } else if (imageSrc) {
      ratioStyle.backgroundImage = `url(${this.props.imageSrc})`;
    }

    return ratioStyle;
  };

  public componentDidMount() {
    const { imageSrc } = this.props;
    this._mounted = true;
    this._loadImage(imageSrc);
  }

  public componentWillUnmount() {
    this._imageLoader.src = "";
    this._mounted = false;
  }

  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
  }

  private onClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  public render() {
    const { children, className, contentClassName } = this.props;
    const { hasBeenLoaded } = this.state;

    return (
      <div
        onClick={this.onClick}
        style={this.getContainerStyle()}
        className={className ? `${className} ImageWithRatio` : "ImageWithRatio"}
      >
        <InView rootMargin="25% 0px" triggerOnce={true}>
          {({ inView, ref }) => (
            <>
              <div
                ref={ref}
                style={this.getRatioStyle()}
                className={"ImageWithRatio__image"}
              />
              {inView && (
                <div>
                  {!hasBeenLoaded && this.props.isSpinner !== false && (
                    <div className="ImageWithRatio__Spinner">
                      <LoaderSpinner />
                    </div>
                  )}
                  <div
                    className={
                      contentClassName
                        ? `${contentClassName} ImageWithRatio__Content`
                        : "ImageWithRatio__Content"
                    }
                  >
                    {hasBeenLoaded && children}
                  </div>
                </div>
              )}
            </>
          )}
        </InView>
      </div>
    );
  }

  private _loadImage(currentOverlayImage = "") {
    if (!this._mounted) {
      return;
    }

    if (!currentOverlayImage) {
      return;
    }

    this._imageLoader.src = currentOverlayImage;
    this._imageLoader.onload = () => {
      if (!this._mounted) {
        return;
      }
      if (this.props.onResize) {
        this.props.onResize(this._imageLoader.width, this._imageLoader.height);
      }
      this.setState({
        width: this._imageLoader.width,
        height: this._imageLoader.height,
        hasBeenLoaded: this.props.imageSrc,
      });
    };
  }
}
