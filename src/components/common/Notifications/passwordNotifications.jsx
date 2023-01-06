import { notification } from "antd";
import React from "react";
import "./notification.scss";
const openNotificationForChangePassword = (placement, msg) => {
  notification.open({
    message: <div className="notificationStyle">{msg}</div>,
    placement,
  });
};

export const ChangePasswordNotification = () =>
  openNotificationForChangePassword(
    "topRight",
    "Password changed Successfully"
  );

export const ChangePasswordFailedNotification = () =>
  openNotificationForChangePassword(
    "topRight",
    "Your current password and entered password is same."
  );

export const ChangePasswordAlertNotification = () =>
  openNotificationForChangePassword("topRight", "Please enter password.");
