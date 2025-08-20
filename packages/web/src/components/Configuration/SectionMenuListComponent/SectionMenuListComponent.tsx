/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

import { ISectionMenuComponentModel } from "@xala/common";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { InView } from "react-intersection-observer";

import { useFilterSectionMenuItems, useHandleResize } from "hooks";

import { ListComponentArrow } from "../ListComponent/components/ListComponentArrow";

import { SectionMenuListComponentItem } from "./components/SectionMenuListComponentItem";
import { useHandleTouchEvents, useTransformValue } from "./hooks";
import "./SectionMenuListComponent.scss";

export interface ISectionMenuListComponentProps {
  component: ISectionMenuComponentModel;
}

const MARGIN_RIGHT = 20;

export const SectionMenuListComponent = ({
  component,
}: ISectionMenuListComponentProps) => {
  const filteredSectionMenuItems = useFilterSectionMenuItems(component.Items);
  const isListNotEmpty = filteredSectionMenuItems
    ? filteredSectionMenuItems.length > 0
    : false;

  const [transform, setTransform] = useState(0);
  const [isTransition, setIsTransition] = useState(true);
  const [itemsDimensionArray, setItemsDimensionArray] = useState<
    { left: number; right: number; width: number }[]
  >([]);
  const [scrollValue, setScrollValue] = useState(0);
  const slider = useRef<HTMLDivElement>(null);
  const innerWidth = useHandleResize(200);
  const MARGIN_LEFT = innerWidth < 500 ? 65 : innerWidth < 1101 ? 167 : 205;

  const { onTouchStart, onTouchMove, onTouchEnd } = useHandleTouchEvents(
    slider,
    innerWidth,
    MARGIN_RIGHT,
    MARGIN_LEFT,
    setTransform,
    setIsTransition
  );

  const transformValue = useTransformValue(
    filteredSectionMenuItems,
    itemsDimensionArray,
    innerWidth,
    MARGIN_LEFT,
    MARGIN_RIGHT
  );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (typeof transform === "number") {
      timer = setTimeout(() => {
        setScrollValue((prev) => prev + 1);
      }, 300);
    }

    return () => clearTimeout(timer);
  }, [transform]);

  const renderItems = useMemo(() => {
    if (filteredSectionMenuItems && isListNotEmpty) {
      return filteredSectionMenuItems.map((item) => (
        <SectionMenuListComponentItem
          key={item.Id}
          item={item}
          setItemsDimensionArray={setItemsDimensionArray}
          scrollValue={scrollValue}
          innerWidth={innerWidth}
        />
      ));
    }
    return null;
  }, [filteredSectionMenuItems, isListNotEmpty, scrollValue, innerWidth]);

  const renderContent = useMemo(() => {
    if (filteredSectionMenuItems && !isListNotEmpty) {
      return null;
    }

    const leftArrowOnClickHandle = () => {
      setItemsDimensionArray([]);
      setTransform((prev) => prev + transformValue.transformValueLeft);
      setIsTransition(true);
    };

    const rightArrowOnClickHandle = () => {
      setItemsDimensionArray([]);
      setTransform((prev) => prev - transformValue.transformValueRight);
      setIsTransition(true);
    };

    const CSS = {
      width: "fit-content",
      minWidth: `calc(${innerWidth}px - ${MARGIN_LEFT}px - ${MARGIN_RIGHT}px)`,
      transform: `translate(${transform}px)`,
      transition: `${isTransition ? "transform 0.25s linear" : "none"}`,
    };

    return (
      <div className="SectionMenuListComponentItem-background">
        <ListComponentArrow
          onClick={leftArrowOnClickHandle}
          direction="left"
          containerStyle={{
            background:
              "linear-gradient(-89.95deg, rgba(42, 47, 54, 0) 0.04%, var(--bg-color) 86.61%)",
            justifyContent: "flex-start",
            top: "unset",
            height: "100px",
          }}
          hideForTabletAndMobile
          disable={transform >= 0}
        />
        <div className="SectionMenuListComponentItem-container">
          <div
            className="slider"
            style={CSS}
            ref={slider}
            onTouchStart={(event) => onTouchStart(event)}
            onTouchMove={(event) => onTouchMove(event)}
            onTouchEnd={onTouchEnd}
          >
            {renderItems}
          </div>
        </div>
        <ListComponentArrow
          onClick={rightArrowOnClickHandle}
          direction="right"
          containerStyle={{
            background:
              "linear-gradient(89.95deg, rgba(42, 47, 54, 0) 0.04%, var(--bg-color) 86.61%)",
            justifyContent: "flex-end",
            top: "unset",
            height: "100px",
          }}
          hideForTabletAndMobile
          disable={transformValue.lastItemRight <= innerWidth - MARGIN_RIGHT}
        />
      </div>
    );
  }, [
    transform,
    filteredSectionMenuItems,
    isListNotEmpty,
    renderItems,
    transformValue,
    innerWidth,
    isTransition,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    MARGIN_LEFT,
  ]);

  if (!isListNotEmpty) {
    return null;
  }

  return (
    <InView
      as="div"
      className="SectionMenuListComponent"
      rootMargin="25% 0px"
      triggerOnce
    >
      {renderContent}
    </InView>
  );
};
