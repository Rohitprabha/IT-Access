import React, { useState, useEffect } from "react";
import "../setup.scss";
import {
  Button,
  Input,
  Layout,
  Form,
  Table,
  Tooltip,
  Typography,
  Popconfirm,
} from "antd";
import * as XLSX from "xlsx";
import { debounce } from "lodash";
import ApplicationModal from "../../common/Modal/ApplicationModal";
import { AddApplicationRequiredNotification } from "../../common/Notifications/RequiredNotification";
import { recordUpdateNotification } from "../../common/Notifications/UpdateNotifications";
import { connectorDeleteNotification } from "../../common/Notifications/DeleteNotifications";
import ConnectorsModal from "../../common/Modal/ConnectorsModal";
import {
  AddConnector,
  DeleteConnector,
  GetConnectorByName,
  GetConnectors,
  UpdateConnector,
} from "../../services/connectors.service";
import ConnectorInput from "../../common/Input/ConnectorInput";
import {
  ConnectorEnvSelect,
  ConnectorSelect,
} from "../../common/Select/ConnectorSelect";

const { Search } = Input;

const { Content } = Layout;

const Connectors = () => {
  const [items, setItems] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [pageLoader, setPageLoader] = useState(false);
  const [toggleState, setToggleState] = useState(1);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("HTTPS");
  const [env, setEnv] = useState("DEV");
  const [url, setUrl] = useState("");
  const [userName, setUserName] = useState("");
  const Applicationtype = ["HTTPS", "HTTP"];
  const envType = ["DEV", "QA", "PROD"];
  const [confirmBtnLoader, setConfirmBtnLoader] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [submitExcel, setSubmitExcel] = useState(false);
  const [password, setPassword] = useState("");
  const [form] = Form.useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const [exportData, setExportData] = useState([]);

  const getAllConnectors = async () => {
    setPageLoader(true);
    items.splice(0, items.length);
    try {
      let connectorResponse = await GetConnectors();
      connectorResponse = await connectorResponse.json();
      if (connectorResponse.Result.length > 0) {
        setItems(connectorResponse.Result);
        setExportData(connectorResponse.Result);
      } else setItems("");
      setTimeout(() => {
        setPageLoader(false);
      }, 1000);
    } catch (error) {
      //console.log("Error", error);
    }
  };

  const searchApplication = debounce(async (e) => {
    let val = e.target.value;
    if (val !== "") {
      try {
        let applicationResponse = await GetConnectorByName(val);
        applicationResponse = await applicationResponse.json();
        if (applicationResponse.Result && applicationResponse.Result.length > 0)
          setItems(applicationResponse.Result);
        else setItems("");
      } catch (error) {
        //console.log("Error", error);
      }
    } else {
      try {
        let applicationResponse = await GetConnectors();
        applicationResponse = await applicationResponse.json();
        if (applicationResponse.Result && applicationResponse.Result.length > 0)
          setItems(applicationResponse.Result);
        else setItems("");
      } catch (error) {
        //console.log("Error", error);
      }
    }
  }, 500);

  useEffect(() => {
    getAllConnectors();
  }, []);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setExcelData(d);
      setSubmitExcel(true);
    });
  };

  const edit = (record) => {
    //console.log("record", record);
    setEditingKey(record._id);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (record) => {
    setEditingKey("");
    try {
      let response = await UpdateConnector(record, record._id);
      response = await response.json();
      recordUpdateNotification();
    } catch (error) {
      //console.log(error);
    }
  };

  const deleteFunc = async (record) => {
    try {
      let response = await DeleteConnector(record, record._id);
      response = await response.json();
      // getAllConnectors();
      let idToRemove = record._id;
      let myArr = items.filter(function (item) {
        return item._id != idToRemove;
      });
      setItems(myArr);
      connectorDeleteNotification();
    } catch (error) {
      //console.log(error);
    }
  };

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType === "type" ? (
        <ConnectorSelect field={record} type="type" values={Applicationtype} />
      ) : inputType === "name" ? (
        <ConnectorInput field={record} type="name" />
      ) : inputType === "env" ? (
        <ConnectorEnvSelect field={record} type="env" values={envType} />
      ) : inputType === "userName" ? (
        <ConnectorInput field={record} type="userName" />
      ) : inputType === "password" ? (
        <ConnectorInput field={record} type="password" />
      ) : inputType === "url" ? (
        <ConnectorInput field={record} type="url" />
      ) : (
        <Input />
      );
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const columns = [
    {
      title: <b>Name</b>,
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: <b>Type</b>,
      dataIndex: "type",
      key: "type",
      editable: true,
    },
    {
      title: <b>Environment</b>,
      dataIndex: "env",
      key: "env",
      editable: true,
    },
    {
      title: <b>URL</b>,
      dataIndex: "url",
      key: "url",
      editable: true,
    },
    {
      title: <b>Username</b>,
      dataIndex: "userName",
      key: "userName",
      editable: true,
    },
    {
      title: <b>Password</b>,
      dataIndex: "password",
      key: "password",
      editable: true,
      render: (_, record) => {
        return <span className="hidetext">{record.password}</span>;
      },
    },
    {
      title: <b>Actions</b>,
      key: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link
              onClick={() => {
                edit(record);
              }}
              className="mr-2"
            >
              <Tooltip title="Edit">
                <i className="fas fa-edit" style={{ color: "blue" }}></i>
              </Tooltip>
            </Typography.Link>
            <Typography.Link
              onClick={() => {
                deleteFunc(record);
              }}
            >
              <Tooltip title="Delete">
                <i
                  className="fas fa-trash ml-1 mr-1"
                  style={{ color: "red" }}
                ></i>
              </Tooltip>
            </Typography.Link>
          </span>
        );
      },
    },
  ];
  const isEditing = (record) => record._id === editingKey;
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "name"
            ? "name"
            : col.dataIndex === "type"
            ? "type"
            : col.dataIndex === "env"
            ? "env"
            : col.dataIndex === "url"
            ? "url"
            : col.dataIndex === "userName"
            ? "userName"
            : col.dataIndex === "password"
            ? "password"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleName = (val) => {
    setName(val);
  };

  const handleType = (val) => {
    setType(val);
  };

  const handleEnv = (val) => {
    setEnv(val);
  };

  const handleUrl = (val) => {
    setUrl(val);
  };

  const handleuserName = (val) => {
    setUserName(val);
  };

  const handlePassword = (val) => {
    setPassword(val);
  };

  let modalValues = {
    name: name,
    type: type,
    url: url,
    userName: userName,
    env: env,
    password: password,
  };

  const handleClose = () => {
    setModal(false);
    setName("");
    setEnv("DEV");
    setUrl("");
    setUserName("");
    setType("HTTPS");
    setPassword("");
    setConfirmBtnLoader(false);
    setExcelData([]);
    setSubmitExcel(false);
  };

  const ConfirmHandler = async () => {
    setConfirmBtnLoader(true);
    if (
      name != "" &&
      url != "" &&
      userName != "" &&
      password !== "" &&
      submitExcel != true
    ) {
      let applicationDetails = {
        name: name,
        type: type,
        env: env,
        url: url,
        userName: userName,
        password: password,
      };
      try {
        let applicationResponse = await AddConnector(applicationDetails);
        applicationResponse = await applicationResponse.json();
        getAllConnectors();
        handleClose();
        setConfirmBtnLoader(false);
        setModal(false);
      } catch (error) {
        //console.log("Error", error);
      }
    } else if (
      name != "" &&
      url != "" &&
      userName != "" &&
      password !== "" &&
      submitExcel == true
    ) {
      let applicationDetails = {
        name: name,
        type: type,
        env: env,
        url: url,
        userName: userName,
        password: password,
      };
      try {
        let applicationResponse = await AddConnector(applicationDetails);
        applicationResponse = await applicationResponse.json();
        //   getAllConnectors();
      } catch (error) {
        //console.log("Error", error);
      }
      try {
        let response = await AddConnector(excelData);
        response = await response.json();
        getAllConnectors();
        handleClose();
        setConfirmBtnLoader(false);
        setModal(false);
      } catch (error) {
        //console.log("Error", error);
      }
    } else if (
      name == "" &&
      url == "" &&
      userName == "" &&
      password == "" &&
      submitExcel == true
    ) {
      try {
        let response = await AddConnector(excelData);
        response = await response.json();
        getAllConnectors();
        handleClose();
        setConfirmBtnLoader(false);
        setModal(false);
      } catch (error) {
        //console.log("Error", error);
      }
    } else {
      AddApplicationRequiredNotification();
      setConfirmBtnLoader(false);
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleExport = () => {
    let newExportData = exportData.map(function (obj) {
      return {
        userName: obj.userName,
        password: obj.password,
        name: obj.name,
        env: obj.env,
        type: obj.type,
        url: obj.url,
      };
    });
    var wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(newExportData);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "ITAccess_Connectors.xlsx");
  };

  return (
    <div>
      <section className="application h-100">
        <div className="h-100">
          {pageLoader ? (
            <div className="text-center my-4 py-4">
              <i className="fas fa-spinner fa-2x fa-spin spinner spinnerTop"></i>
              <div className="loaderText mt-2">Fetching All Connectors</div>
            </div>
          ) : (
            <div>
              <div className="pl-3 my-4 mb-4">
                <div className="content-tabs">
                  <div className="content  active-content d-flex flex-column">
                    <div className="d-flex mb-4 justify-content-between">
                      <div style={{ fontSize: "1rem", color: "#00aae7" }}>
                        Connectors
                      </div>
                      <div className="d-flex">
                        <Search
                          allowClear
                          // size="large"
                          onChange={(e) => searchApplication(e)}
                          placeholder="Search for connectors"
                          className="mr-3"
                        />
                        <Button
                          type="primary"
                          className="buttonStyles mr-3"
                          onClick={() => setModal(true)}
                        >
                          Add
                        </Button>
                        <Button
                          type="primary"
                          className="buttonStyles"
                          onClick={handleExport}
                        >
                          Export
                        </Button>
                      </div>
                    </div>
                    <Form form={form} component={false}>
                      <Table
                        components={{
                          body: {
                            cell: EditableCell,
                          },
                        }}
                        bordered
                        dataSource={items}
                        columns={mergedColumns}
                        rowClassName="editable-row"
                        pagination={{ pageSize: 7 }}
                        // scroll={{
                        //   x: 200,
                        //   y: 500,
                        // }}
                      />
                    </Form>
                    <ConnectorsModal
                      visibility={modal}
                      handleClose={handleClose}
                      values={modalValues}
                      handleName={handleName}
                      handleEnv={handleEnv}
                      handleUrl={handleUrl}
                      handleuserName={handleuserName}
                      handleType={handleType}
                      handlePassword={handlePassword}
                      ConfirmHandler={ConfirmHandler}
                      confirmBtnLoader={confirmBtnLoader}
                      readExcel={readExcel}
                      togglePassword={togglePassword}
                      passwordShown={passwordShown}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Connectors;
