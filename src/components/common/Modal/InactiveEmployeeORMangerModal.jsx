import React from "react";
import { Button, Modal, Table } from "antd";
import "./modal.scss";

const InactiveEmployeeORMangerModal = (props) => {
  const columns = [
    {
      title: <b>Employee</b>,
      dataIndex: "empName",
    },
    {
      title: <b>Manager</b>,
      dataIndex: "managerName",
    },
    {
      title: <b>Application</b>,
      dataIndex: "appName",
    },
    {
      title: <b>Application Owner</b>,
      dataIndex: "appOwner",
    },
  ];

  const accessColumns = [
    {
      title: <b>Employee</b>,
      dataIndex: "empName",
    },
    {
      title: <b>Manager</b>,
      dataIndex: "managerName",
    },
  ];
  return (
    <Modal
      title={
        props.from == "inactiveEmployees" ? (
          <b>Defective Access</b>
        ) : (
          <b>Employees with Inactive Manager</b>
        )
      }
      visible={props.pendingModal}
      className="modalFont"
      onCancel={() => {
        props.setPendingModal(false);
      }}
      footer={null}
      keyboard={false}
    >
      <Table
        columns={props.from == "inactiveEmployees" ? columns : accessColumns}
        dataSource={props.pendingApprovals}
        size="middle"
        bordered={true}
      />
      <Button
        style={{
          left: "90%",
          fontSize: "1rem",
          height: "fit-content",
          width: "118px",
        }}
        onClick={() => {
          props.setPendingModal(false);
        }}
      >
        Ok
      </Button>
    </Modal>
  );
};

export default InactiveEmployeeORMangerModal;
