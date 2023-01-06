import React from "react";
import { Button, Modal, Table } from "antd";
import "./modal.scss";

const PendingApprovalsORAccessModal = (props) => {
  const columns = [
    {
      title: <b>Employee</b>,
      dataIndex: "empName",
    },
    {
      title: <b>Application</b>,
      dataIndex: "appName",
    },
    {
      title: <b>Requested Date</b>,
      dataIndex: "requestedDate",
      render: (_, record) => {
        const formatedDate = new Date(record.requestedDate).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        );
        return <span>{formatedDate}</span>;
      },
    },
    {
      title: <b>Pending With</b>,
      dataIndex: "pendingWith",
    },
  ];

  const accessColumns = [
    {
      title: <b>Employee</b>,
      dataIndex: "empName",
    },
    {
      title: <b>Application</b>,
      dataIndex: "appName",
    },
    {
      title: <b>Requested Date</b>,
      dataIndex: "requestedDate",
      render: (_, record) => {
        const formatedDate = new Date(record.requestedDate).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        );
        return <span>{formatedDate}</span>;
      },
    },
    {
      title: <b>Approved Date</b>,
      dataIndex: "approvedDate",
      render: (_, record) => {
        const formatedDate = new Date(record.approvedDate).toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        );
        return <span>{formatedDate}</span>;
      },
    },
    {
      title: <b>Approved By</b>,
      dataIndex: "approvedBy",
    },
    {
      title: <b>Pending With</b>,
      dataIndex: "pendingWith",
    },
  ];
  return (
    <Modal
      title={
        props.from == "pendingRequests" ? (
          <b>Pending Approvals</b>
        ) : (
          <b>Pending Access</b>
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
        columns={props.from == "pendingRequests" ? columns : accessColumns}
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

export default PendingApprovalsORAccessModal;
