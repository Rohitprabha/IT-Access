import React, { useState } from "react";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  List,
  Modal,
  Select,
  Table,
  Tabs,
  Tooltip,
  Typography,
} from "antd";
import "./modal.scss";
import UsersDropdown from "../../Access/NewEmployee/UsersDropdown";
import { GetEmployeeByMail } from "../../services/setup.service";

const { TabPane } = Tabs;
const { Search } = Input;

const AccessApplicationModal = (props) => {
  return (
    <Modal
      title={<b>Add Employee</b>}
      visible={props.visibility}
      className="modalFont modalSection"
      onCancel={props.handleClose}
      footer={null}
      keyboard={false}
    >
      {/* <Tabs type="card"> */}
        {/* <TabPane tab={<b>Add Employee</b>} key="1"> */}
          <div className="d-flex justify-content-around mb-4 mt-3">
            <UsersDropdown
              getUsers={props.getUsers}
              value={props.value}
              setValues={props.handleSetValue}
            />
            <Button
              type="primary"
              onClick={props.handleShare}
              style={{ width: "6%", placeSelf: "center" }}
            >
              Add
            </Button>
            <Form form={props.form} component={false}>
              <Table
                columns={props.columns}
                dataSource={props.tableData}
                size="middle"
                style={{ width: "50%" }}
                bordered={true}
              />
            </Form>
          </div>
        {/* </TabPane> */}
        {/* <TabPane tab={<b>Add Applications</b>} key="2">
          <form>
            <div className="form-group d-flex">
              <Search
                allowClear
                // size="large"
                value={props.searchText}
                onChange={(e) => props.searchFilter(e.target.value)}
                placeholder="Search for application"
                className="mr-3"
              />
            </div>
            <div className="form-group">
              {props.recommendedLoader ? (
                <div className="text-center my-4 py-4">
                  <i className="fas fa-spinner fa-2x fa-spin spinner spinnerColor" />
                  <div className="loaderText spinnerColor mt-2">
                    <b>Loading</b>
                  </div>
                </div>
              ) : (
                <>
                  <List
                    itemLayout="horizontal"
                    dataSource={props.searchApps}
                    className="modalListStyle"
                    renderItem={(item) => (
                      <List.Item className="ml-0 d-inline-flex w-100 justify-content-lg-start">
                        <Checkbox
                          className="mr-4"
                          onChange={(e, value) => {
                            props.onRecommendedItemChecked(
                              item,
                              e,
                              "selectOne"
                            );
                          }}
                          checked={item.checked}
                        />
                        <List.Item className="listStyle">{item.name}</List.Item>
                      </List.Item>
                    )}
                  />
                </>
              )}
            </div>
          </form>
        </TabPane> */}
      {/* </Tabs> */}
      <div style={{ textAlign: "right" }}>
        <Button className="btnWidth mr-4" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button
          type="primary"
          className="float-right buttonStyle btnWidth"
          onClick={props.handleSubmitRecommendedApplications}
          disabled={props.disabled}
        >
          {props.addSpinner ? (
            <i className="fas fa-spinner fa-2x fa-spin spinner spinnerColor"></i>
          ) : null}
          Request
        </Button>
      </div>
    </Modal>
  );
};

export default AccessApplicationModal;
