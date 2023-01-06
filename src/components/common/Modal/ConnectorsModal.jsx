import React from "react";
import { Button, DatePicker, Input, Modal, Select } from "antd";
import "./modal.scss";

const { Option } = Select;
const ConnectorsModal = (props) => {
  return (
    <Modal
      title={<b>Add Connector</b>}
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
              placeholder="Enter name"
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
          <div className="form-group col-md-4">
            <label htmlFor="userName" className="font-weight-bold fontsize">
              User Name
              <span className="ml-1" style={{ color: "red" }}>
                *
              </span>
            </label>
            <Input
              size="large"
              className="form-control"
              id="userName"
              placeholder="Enter Username"
              value={props.values.userName}
              onChange={(e) => {
                if (e.target.value != "") {
                  props.handleuserName(e.target.value);
                } else {
                  props.handleuserName("");
                }
              }}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="password" className="font-weight-bold fontsize">
              Password
              <span className="ml-1" style={{ color: "red" }}>
                *
              </span>
            </label>
            {/* <Input
              size="large"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              
              onChange={(e) => {
                if (e.target.value != "") {
                  props.handlePassword(e.target.value);
                } else {
                  props.handlePassword("");
                }
              }}
            /> */}
            <div className="d-flex bord">
              <Input
                type={props.passwordShown ? "text" : "password"}
                size="large"
                className="form-control position-static"
                id="password"
                placeholder="Enter password"
                value={props.values.password}
                onChange={(e) => {
                  if (e.target.value != "") {
                    props.handlePassword(e.target.value);
                  } else {
                    props.handlePassword("");
                  }
                }}
              />
              {props.passwordShown ? (
                <i
                  className="fas fa-eye-slash password icon-sty"
                  onClick={props.togglePassword}
                ></i>
              ) : (
                <i
                  className="fas fa-eye icon-sty password"
                  onClick={props.togglePassword}
                ></i>
              )}
            </div>
          </div>
        </div>
        <div className="d-flex">
          <div className="form-group col-md-4">
            <label htmlFor="url" className="font-weight-bold fontsize">
              URL
              <span className="ml-1" style={{ color: "red" }}>
                *
              </span>
            </label>
            <Input
              size="large"
              className="form-control"
              id="url"
              placeholder="Enter URL"
              value={props.values.url}
              onChange={(e) => {
                if (e.target.value != "") {
                  props.handleUrl(e.target.value);
                } else {
                  props.handleUrl("");
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
              value={props.values.type}
              onChange={props.handleType}
            >
              <Option value="HTTPS">HTTPS</Option>
              <Option value="HTTP">HTTP</Option>
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

export default ConnectorsModal;
