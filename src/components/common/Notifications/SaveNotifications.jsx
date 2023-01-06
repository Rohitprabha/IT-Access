import { notification } from "antd";
import React from "react";
import "./notification.scss";
const openNotificationForSave = (placement, msg) => {
  notification.open({
    message: <div className="notificationStyle">{msg} saved.</div>,
    placement,
  });
};

export const SaveTemplateNotification = () => {
  openNotificationForSave("topRight", "Template");
};

export const SaveRecordNotification = () => {
  openNotificationForSave("topRight", "Record");
};
