import { notification } from 'antd'
import React from 'react'
import './notification.scss'
const openNotificationForUpdate = (placement, msg) => {
    notification.open({
        message: <div className="notificationStyle">{msg} updated.</div>,
        placement,
    });
};

export const ProfileUpdateNotification = () =>{
    openNotificationForUpdate("topRight","Profile")
}

export const recordUpdateNotification = () =>{
    openNotificationForUpdate("topRight","Record")
}