import { notification } from 'antd'
import React from 'react'
import './notification.scss'
const openNotificationForFailedLogin = (placement) => {
    notification.open({
        message: <div className="notificationStyle">No user found</div>,
        placement,
    });
};
const LoginNotification = () =>
    openNotificationForFailedLogin("topRight")
export default LoginNotification