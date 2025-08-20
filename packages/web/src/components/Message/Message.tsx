/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";
import Notification from "rc-notification";
import "rc-notification/assets/index.css";
import { NotificationInstance } from "rc-notification/lib/Notification";

import ErrorIcon from "../../resources/icons/notification/error.svg";
import InfoIcon from "../../resources/icons/notification/info.svg";
import SuccessIcon from "../../resources/icons/notification/success.svg";
import WarningIcon from "../../resources/icons/notification/warning.svg";

import "./Message.scss";

let notification: NotificationInstance;
Notification.newInstance({}, (n: NotificationInstance) => {
  notification = n;
});

export class Message {
  static success(content: string): void {
    const icon = (
      <i className="Message__icon Message__icon--success">
        <SuccessIcon />
      </i>
    );
    Message.showMessage(icon, content);
  }

  static error(content: string): void {
    const icon = (
      <i className="Message__icon Message__icon--error">
        <ErrorIcon />
      </i>
    );
    Message.showMessage(icon, content);
  }

  static info(content: string): void {
    const icon = (
      <i className="Message__icon Message__icon--info">
        <InfoIcon />
      </i>
    );
    Message.showMessage(icon, content);
  }

  static warning(content: string): void {
    const icon = (
      <i className="Message__icon Message__icon--warning">
        <WarningIcon />
      </i>
    );
    Message.showMessage(icon, content);
  }

  static showMessage(icon: any, content: string) {
    notification.notice({
      content: (
        <div className="Message__container" role="alert">
          {icon}
          <span>{content}</span>
        </div>
      ),
      duration: 3.5,
    });
  }
}
