import { notification } from "antd";
import React from "react";
import "./notification.scss";
const openNotificationForNoEmployee = (placement,msg) => {
  notification.open({
    message: <div className="notificationStyle">No { msg} Found.</div>,
    placement,
  });
};

export const NoEmployeeNotification = () => {
  openNotificationForNoEmployee("topRight", "Record");
};

export const NoEmployeeNotifications = () => {
  openNotificationForNoEmployee("topRight", "Employee");
};

export const NoApplicationNotifications = () => {
  openNotificationForNoEmployee("topRight", "Application");
};