import React from "react";
import { Button, DatePicker, Input, Modal, Select } from "antd";
import moment from "moment";
import "./modal.scss";

const { Option } = Select;
const PopUpModal = (props) => {
  const dateFormatList = ["MM/DD/YYYY", "MM/DD/YYYY"];
  return (
    <Modal
      title={<b>Add Employee</b>}
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
              Full Name
              <span className="ml-1" style={{ color: "red" }}>
                *
              </span>
            </label>
            <Input
              size="large"
              className="form-control"
              id="name"
              placeholder="Enter fullname"
              value={props.values.fullName}
              onChange={(e) => {
                if (e.target.value != "") {
                  props.handleFullname(e.target.value);
                } else {
                  props.handleFullname("");
                }
              }}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="username" className="font-weight-bold fontsize">
              User Name
              <span className="ml-1" style={{ color: "red" }}>
                *
              </span>
            </label>
            <Input
              size="large"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={props.values.userName}
              onChange={(e) => {
                if (e.target.value != "") {
                  props.handleUserName(e.target.value);
                } else {
                  props.handleUserName("");
                }
              }}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="email" className="font-weight-bold fontsize">
              Email
              <span className="ml-1" style={{ color: "red" }}>
                *
              </span>
            </label>
            <Input
              size="large"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={props.values.email}
              onChange={(e) => {
                if (e.target.value != "") {
                  props.handleMail(e.target.value);
                } else {
                  props.handleMail("");
                }
              }}
            />
          </div>
        </div>
        <div className="d-flex">
          <div className="form-group col-md-4 d-flex flex-column">
            <label htmlFor="empType" className="font-weight-bold fontsize">
              Employment
              <span className="ml-1" style={{ color: "red" }}>
                *
              </span>
            </label>
            <Select
              placeholder="Please select Employment"
              value={props.values.empType}
              onChange={props.handleEmpType}
            >
              <Option value="Full Time">Full Time</Option>
              <Option value="Contractor">Contractor</Option>
              <Option value="Vendor">Vendor</Option>
            </Select>
          </div>
          <div className="form-group col-md-4 d-flex flex-column">
            <label htmlFor="empRole" className="font-weight-bold fontsize">
              Role
              <span className="ml-1" style={{ color: "red" }}>
                *
              </span>
            </label>
            <Select
              placeholder="Please select role"
              value={props.values.empRole}
              onChange={props.handleEmpyRole}
            >
              <Option value="Team Member">Team Member</Option>
              <Option value="Administrator">Administrator</Option>
              <Option value="Manager">Manager</Option>
            </Select>
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="managerMail" className="font-weight-bold fontsize">
              Manager
              <span className="ml-1" style={{ color: "red" }}>
                *
              </span>
            </label>
            <Input
              size="large"
              className="form-control"
              id="managerMail"
              placeholder="Enter Manager Mail"
              value={props.values.managerMail}
              onChange={(e) => {
                if (e.target.value != "") {
                  props.handleManagerMail(e.target.value);
                } else {
                  props.handleManagerMail("");
                }
              }}
            />
          </div>
        </div>
        <div className="d-flex">
          <div className="form-group col-md-4 d-flex flex-column">
            <label htmlFor="startDate" className="font-weight-bold fontsize">
              Start Date
              <span className="ml-1" style={{ color: "red" }}>
                *
              </span>
            </label>
            {props.selectStartDate ? (
              <DatePicker
                defaultValue={moment(props.values.startDate, dateFormatList[0])}
                format={dateFormatList}
                onChange={props.handleStartDate}
              />
            ) : (
              <DatePicker
                format={dateFormatList}
                onChange={props.handleStartDate}
              />
            )}
          </div>
          <div className="form-group col-md-4 d-flex flex-column">
            <label htmlFor="endDate" className="font-weight-bold fontsize">
              End Date
            </label>
            {props.selectEndDate ? (
              <DatePicker
                defaultValue={moment(props.values.endDate, dateFormatList[0])}
                format={dateFormatList}
                onChange={props.handleEndDate}
              />
            ) : (
              <DatePicker
                format={dateFormatList}
                onChange={props.handleEndDate}
              />
            )}
          </div>
          <div className="form-group col-md-4 d-flex flex-column">
            <label htmlFor="status" className="font-weight-bold fontsize">
              Status
              <span className="ml-1" style={{ color: "red" }}>
                *
              </span>
            </label>
            <Select
              placeholder="Please select status"
              value={props.values.status}
              onChange={props.handleStatus}
            >
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </div>
        </div>
        <div className="d-flex">
          {props.showPassword ? (
            <div className="form-group col-md-4">
              <label htmlFor="password" className="font-weight-bold fontsize">
                Password
                <span className="ml-1" style={{ color: "red" }}>
                  *
                </span>
              </label>
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
          ) : null}
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

export default PopUpModal;
