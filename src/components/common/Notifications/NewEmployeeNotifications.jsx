import { notification } from "antd";
import React from "react";
import "./notification.scss";
const openNotificationForNoEmployee = (placement, msg) => {
  notification.open({
    message: (
      <div className="notificationStyle">Please add {msg}.</div>
    ),
    placement,
  });
};

export const AddAtleastOneEmployeeNotification = () => {
  openNotificationForNoEmployee("topRight", "employees");
};

export const AddAtleastOneApplicationNotification = () => {
  openNotificationForNoEmployee("topRight", "applications");
};
