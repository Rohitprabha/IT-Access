import React from "react";
import { Button, DatePicker, Input, Modal, Select } from "antd";
import "./modal.scss";

const { Option } = Select;
const ApplicationModal = (props) => {
  return (
    <Modal
      title={<b>Add Application</b>}
      visible={props.visibility}
      className="modalFont modalSection"
      onCancel={props.handleClose}
      footer={null}
      keyboard={false}
    >
      <form>
        <div className="d-flex">
          <div className="form-group col-md-4">
            <label htmlFor="name" className="font-weight-bold fontsize">
              Name
              <span className="ml-1" style={{ color: "red" }}>
                *
              </span>
            </label>
            <Input
              size="large"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              value={props.values.name}
              onChange={(e) => {
                if (e.target.value != "") {
                  props.handleName(e.target.value);
                } else {
                  props.handleName("");
                }
              }}
            />
          </div>
          <div className="form-group col-md-4 d-flex flex-column">
            <label htmlFor="type" className="font-weight-bold fontsize">
              Type
              <span className="ml-1" style={{ color: "red" }}>
                *
              </span>
            </label>
            <Select
              placeholder="Please select Type"
              defaultValue={props.values.type}
              onChange={props.handleType}
            >
              <Option value="Hardware">Hardware</Option>
              <Option value="Software">Software</Option>
            </Select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="env" className="font-weight-bold fontsize">
              Environment
              <span className="ml-1" style={{ color: "red" }}>
                *
              </span>
            </label>
            <Select
              placeholder="Please select Env"
              value={props.values.env}
              onChange={props.handleEnv}
              className="w-100"
            >
              <Option value="DEV">DEV</Option>
              <Option value="QA">QA</Option>
              <Option value="PROD">PROD</Option>
            </Select>
          </div>
        </div>
        <div className="d-flex">
          <div className="form-group col-md-4">
            <label htmlFor="approveMail" className="font-weight-bold fontsize">
              Approver Mail
              <span className="ml-1" style={{ color: "red" }}>
                *
              </span>
            </label>
            <Input
              size="large"
              className="form-control"
              id="approveMail"
              placeholder="Enter Approver Mail"
              value={props.values.approveMail}
              onChange={(e) => {
                if (e.target.value != "") {
                  props.handleApproveMail(e.target.value);
                } else {
                  props.handleApproveMail("");
                }
              }}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="teamMail" className="font-weight-bold fontsize">
              Team Mail
              <span className="ml-1" style={{ color: "red" }}>
                *
              </span>
            </label>
            <Input
              size="large"
              className="form-control"
              id="teamMail"
              placeholder="Enter Team Mail"
              value={props.values.teamMail}
              onChange={(e) => {
                if (e.target.value != "") {
                  props.handleTeamMail(e.target.value);
                } else {
                  props.handleTeamMail("");
                }
              }}
            />
          </div>
          <div className="form-group col-md-4 d-flex flex-column">
            <label htmlFor="teammail" className="font-weight-bold fontsize">
              Connector
              <span className="ml-1" style={{ color: "red" }}>
                *
              </span>
            </label>
            <Select
              showSearch
              id="accessType"
              placeholder="Select a Connector"
              optionFilterProp="children"
              value={props.values.connectorType}
              onChange={props.onChange}
              onSearch={props.onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {props.connectorItems.length > 0 &&
                props.connectorItems.map((item) => {
                  return <Option value={item.name}>{item.name}</Option>;
                })}
            </Select>
          </div>
        </div>
        <div className="d-flex">
          <div className="form-group col-md-4">
            <label
              htmlFor="applicationURL"
              className="font-weight-bold fontsize"
            >
              Application URL
              {/* <span className="ml-1" style={{ color: "red" }}>
                *
              </span> */}
            </label>
            <Input
              size="large"
              className="form-control"
              id="applicationURL"
              placeholder="Enter Application URL "
              value={props.values.applicationURL}
              onChange={(e) => {
                if (e.target.value != "") {
                  props.handleApplicationURL(e.target.value);
                } else {
                  props.handleApplicationURL("");
                }
              }}
            />
          </div>
          <div className="form-group col-md-4">
            <label
              htmlFor="documentationURL"
              className="font-weight-bold fontsize"
            >
              Documentation URL
              {/* <span className="ml-1" style={{ color: "red" }}>
                *
              </span> */}
            </label>
            <Input
              size="large"
              className="form-control"
              id="documentationURL"
              placeholder="Enter Documentation URL"
              value={props.values.documentationURL}
              onChange={(e) => {
                if (e.target.value != "") {
                  props.handleDocumentationURL(e.target.value);
                } else {
                  props.handleDocumentationURL("");
                }
              }}
            />
          </div>
        </div>
      </form>
      <div className="chooseSty mt-4 mb-4">
        <div className="mainTitle">OR</div>
        <input
          type="file"
          onChange={(e) => {
            const file = e.target.files[0];
            props.readExcel(file);
          }}
          className="chooseInput"
        />
      </div>
      <Button
        style={{
          left: "78%",
          fontSize: "1rem",
          height: "fit-content",
          width: "118px",
        }}
        onClick={props.handleClose}
      >
        Cancel
      </Button>
      <Button
        type="primary"
        className="float-right buttonStyle"
        onClick={props.ConfirmHandler}
        style={{
          fontSize: "1rem",
          height: "fit-content",
          width: "118px",
        }}
      >
        {props.confirmBtnLoader ? (
          <i
            className="fas fa-spinner mr-2 fa-spin"
            style={{ fontSize: "0.9rem", color: "white" }}
          ></i>
        ) : null}
        Add
      </Button>
    </Modal>
  );
};

export default ApplicationModal;
