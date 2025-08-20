/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { ThemeContext } from "@xala/common";
import cx from "classnames";
import { CarouselSlideRenderControlProps } from "nuka-carousel";
import React from "react";

import { MDUp } from "../../../..";

import "./ListComponentDotsContainer.scss";

export type IListComponentDotsContainerProps = CarouselSlideRenderControlProps;

export class ListComponentDotsContainer extends React.PureComponent<IListComponentDotsContainerProps> {
  static contextType = ThemeContext;

  public static defaultProps = {};

  private getIndexes = (count: number, inc: number) => {
    const arr = [];
    for (let i = 0; i < count; i += inc) {
      arr.push(i);
    }
    return arr;
  };

  render() {
    const { slideCount, slidesToScroll, currentSlide, goToSlide } = this.props;

    return (
      <MDUp>
        <div className="ListComponentDotsContainer">
          <div className="ListComponentDotsContainer__Line" />
          <ul className="ListComponentDotsContainer__Dots">
            {this.getIndexes(slideCount, +slidesToScroll).map(
              (index: number) => {
                return (
                  <li className="ListComponentDotsContainer__Dot" key={index}>
                    <button
                      className={cx("ListComponentDotsContainer__DotButton", {
                        "ListComponentDotsContainer__DotButton--active":
                          currentSlide === index,
                      })}
                      onClick={goToSlide.bind(null, index)}
                    >
                      &bull;
                    </button>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </MDUp>
    );
  }
}
