import { notification } from "antd";
import React from "react";
import "./notification.scss";
const openNotificationForRequiredField = (placement) => {
  notification.open({
    message: (
      <div className="notificationStyle">
        Please fill all the fields or upload excel file.
      </div>
    ),
    placement,
  });
};

const openNotificationForTemplate = (placement) => {
  notification.open({
    message: <div className="notificationStyle">Template name required.</div>,
    placement,
  });
};

const openNotificationForEmp = (placement) => {
  notification.open({
    message: (
      <div className="notificationStyle">Please fill all the fields.</div>
    ),
    placement,
  });
};

export const AddEmployeeRequiredNotification = () => {
  openNotificationForRequiredField("topRight");
};

export const AddApplicationRequiredNotification = () => {
  openNotificationForRequiredField("topRight");
};

export const AddTemplateRequiredNotification = () => {
  openNotificationForTemplate("topRight");
};

export const EmpNotification = () => {
  openNotificationForEmp("topRight");
};
