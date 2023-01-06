import { notification } from "antd";
import React from "react";
import "./notification.scss";
const openNotificationForRequest = (placement, msg) => {
  notification.open({
    message: <div className="notificationStyle">{msg} requested.</div>,
    placement,
  });
};

const openNotificationForApprove = (placement, msg) => {
  notification.open({
    message: <div className="notificationStyle">{msg} Successfully.</div>,
    placement,
  });
};

export const ShareTemplateNotification = () => {
  openNotificationForRequest("topRight", "Successfully");
};

export const ApproveNotification = () => {
  openNotificationForApprove("topRight", "Approved");
};
export const GrantNotification = () => {
  openNotificationForApprove("topRight", "Granted");
};
export const RevokeNotification = () => {
  openNotificationForApprove("topRight", "Revoked");
};
export const RemainderNotification = () => {
  openNotificationForApprove("topRight", "Remainder Sent");
};