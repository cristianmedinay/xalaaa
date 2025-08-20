/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import classNames from "classnames";
import RcDialog from "rc-dialog";
import * as React from "react";

import { useBreakpoints } from "..";
import CloseOutlined from "../../resources/icons/x.svg";
import { IMediaButtonProps, MediaButton } from "../MediaButton";

import "./Dialog.scss";

import { MediaButtonVariant } from "enums";

let mousePosition: { x: number; y: number } | undefined;
export const destroyFns: Array<() => void> = [];

const getClickPosition = (e: MouseEvent) => {
  mousePosition = {
    x: e.pageX,
    y: e.pageY,
  };
  setTimeout(() => {
    mousePosition = undefined;
  }, 100);
};

if (
  typeof window !== "undefined" &&
  window.document &&
  window.document.documentElement
) {
  window.document.addEventListener("click", getClickPosition);
}

type getContainerFunc = () => HTMLElement;

export interface IDialogProps {
  visible?: boolean;
  confirmLoading?: boolean;
  title?: React.ReactNode | string;
  closable?: boolean;
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  onCancel?: (e: Event) => void;
  afterClose?: () => void;
  centered?: boolean;
  width?: number;
  footer?: React.ReactNode;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  maskClosable?: boolean;
  forceRender?: boolean;
  okButtonProps?: IMediaButtonProps;
  cancelButtonProps?: IMediaButtonProps;
  destroyOnClose?: boolean;
  style?: React.CSSProperties;
  wrapClassName?: string;
  maskTransitionName?: string;
  transitionName?: string;
  className?: string;
  getContainer?: string | HTMLElement | getContainerFunc | false | null;
  zIndex?: number;
  bodyStyle?: React.CSSProperties;
  maskStyle?: React.CSSProperties;
  mask?: boolean;
  keyboard?: boolean;
  prefixCls?: string;
  closeIcon?: React.ReactNode;
}

export interface ModalLocale {
  okText: string;
  cancelText: string;
  justOkText: string;
}

type IDialogInterface = React.FC<IDialogProps>;

const Dialog: IDialogInterface = (props) => {
  const { isXS, isSM } = useBreakpoints();

  const onCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onCancel } = props;
    if (onCancel) {
      onCancel(e.nativeEvent);
    }
  };

  const onClose = (e: React.SyntheticEvent<Element, Event>) => {
    const { onCancel } = props;
    if (onCancel) {
      onCancel(e.nativeEvent);
    }
  };

  const onOkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onOk } = props;
    if (onOk) {
      onOk(e);
    }
  };

  const renderFooter = () => {
    const { okText, cancelText } = props;
    return (
      <>
        <MediaButton
          variant={MediaButtonVariant.Plain}
          onClick={onCancelClick}
          {...props.cancelButtonProps}
        >
          {cancelText || "Cancel"}
        </MediaButton>
        <MediaButton
          variant={MediaButtonVariant.Plain}
          onClick={onOkClick}
          {...props.okButtonProps}
        >
          {okText || "OK"}
        </MediaButton>
      </>
    );
  };

  const { footer, visible, wrapClassName, closeIcon, ...restProps } = props;

  const defaultFooter = <>{renderFooter()}</>;

  const closeIconToRender = (
    <span className="Dialog-close-x">{closeIcon || <CloseOutlined />}</span>
  );

  const wrapClassNameExtended = classNames("Dialog-centered", wrapClassName);
  return (
    <RcDialog
      {...restProps}
      getContainer={() => document.getElementById("root") || document.body}
      prefixCls="Dialog"
      wrapClassName={wrapClassNameExtended}
      footer={footer === undefined ? defaultFooter : footer}
      visible={visible}
      mousePosition={mousePosition}
      onClose={onClose}
      closeIcon={closeIconToRender}
      style={isXS || isSM ? { width: "80%" } : { width: 520 }}
    />
  );
};

Dialog.defaultProps = {
  transitionName: "zoom",
  maskTransitionName: "fade",
  confirmLoading: false,
  visible: false,
};

export { Dialog };
