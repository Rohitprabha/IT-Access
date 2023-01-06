import React, { useState, useEffect } from "react";
import "./employeeHome.scss";
import {
  Button,
  Input,
  List,
  Layout,
  Empty,
  Form,
  Select,
  Tooltip,
  Table,
  Typography,
  DatePicker,
  Collapse,
  Drawer,
} from "antd";
import { debounce, indexOf } from "lodash";
import { SaveTemplateNotification } from "../../common/Notifications/SaveNotifications";
import {
  GetApplicationByName,
  GetApplications,
} from "../../services/application.service";
import {
  AddTemplate,
  DeleteTemplate,
  GetTemplateByName,
  GetTemplates,
  UpdateTemplate,
} from "../../services/template.service";
import { applicationDeleteNotification } from "../../common/Notifications/DeleteNotifications";
import { recordUpdateNotification } from "../../common/Notifications/UpdateNotifications";
import { AddTemplateRequiredNotification } from "../../common/Notifications/RequiredNotification";
import { Link, useParams } from "react-router-dom";
import {
  GetEmployeeById,
  GetEmployeeByMailId,
  ShareApp,
} from "../../services/newEmployee.services";
import {
  GetEmployeeByMail,
  UpdateEmployee,
} from "../../services/setup.service";
import {
  ApproveNotification,
  GrantNotification,
  RemainderNotification,
  RevokeNotification,
  ShareTemplateNotification,
} from "../../common/Notifications/ShareNotifications";
import moment from "moment";
import EmployeeDetailsModal from "../../common/Modal/EmployeeDetailsModal";
import GrantRevokeModal from "../../common/Modal/GrantRevokeModal";
import { EmployeeApplicationAccess } from "../../services/byEmployee.service";
import { resolveUserData } from "../../services/configs";
import {
  GetAppDetails,
  RemainderEMail,
} from "../../services/employeeHome.service";
import EmployeeSidebar from "../../common/Sidebar/EmployeeSidebar";

const { Search } = Input;
const { Content } = Layout;
const { Option } = Select;
const { Panel } = Collapse;
const { Sider } = Layout;

const EmployeeHome = () => {
  const { empId } = useParams();
  const [items, setItems] = useState([]);
  const userData = resolveUserData();
  const [pageLoader, setPageLoader] = useState(false);
  const [toggleState, setToggleState] = useState(1);
  const [modal, setModal] = useState(false);
  const [grantModal, setGrantModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState("");
  const [confirmBtnLoader, setConfirmBtnLoader] = useState(false);
  const [recommendedLoader, setRecommendedLoader] = useState(false);
  const [apps, setApps] = useState([]);
  const [resultArray, setResultArray] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [Checked, setChecked] = useState(false);
  const [employeeApplications, setEmployeeApplications] = useState([]);
  const [employeeGrantedApplications, setEmployeeGrantedApplications] =
    useState([]);
  const [employeeApprovedApplications, setEmployeeApprovedApplications] =
    useState([]);
  const [employeeRequestedApplications, setEmployeeRequestedApplications] =
    useState([]);
  const [employeeRevokedApplications, setEmployeeRevokedApplications] =
    useState([]);
  const [tableData, setTableData] = useState([]);
  const [value, setValue] = useState();
  const [tableValues, setTableValues] = useState([]);
  const [form] = Form.useForm();
  const [searchApps, setSearchApps] = useState([]);
  const [searchGrantedApps, setSearchGrantedApps] = useState([]);
  const [searchApprovedApps, setSearchApprovedApps] = useState([]);
  const [searchRequestedApps, setSearchRequestedApps] = useState([]);
  const dateFormatList = ["MM/DD/YYYY", "MM/DD/YY"];
  const [requestActions, setRequestActions] = useState(["Approve", "Deny"]);
  const [approveActions, setApproveActions] = useState(["Grant", "Deny"]);
  const [selectedAction, setSelectedAction] = useState("Approve");
  const [selectedApproveAction, setSelectedApproveAction] = useState("Grant");
  const [showAction, setShowAction] = useState(false);
  const [accessId, setAccessId] = useState("");
  const [visible, setVisible] = useState(false);
  const [selectedApp, setSelectedApp] = useState("");
  const [showRemainder, setShowRemainder] = useState(false);
  const [application, setApplication] = useState("");
  const searchFilter = (searchText) => {
    if (searchText != "") {
      let filteredApps = apps.filter((val) => {
        if (val.name.toLowerCase().includes(searchText.toLowerCase())) {
          return val;
        }
      });
      setSearchApps(filteredApps);
    } else {
      setSearchApps([]);
    }
  };

  const grantAppSearchFilter = (searchText) => {
    if (searchText != "") {
      let filteredApps = employeeGrantedApplications.filter((val) => {
        if (val.name.toLowerCase().includes(searchText.toLowerCase())) {
          return val;
        }
      });
      setSearchGrantedApps(filteredApps);
    } else {
      setSearchGrantedApps(employeeGrantedApplications);
    }
  };

  const requestAppSearchFilter = (searchText) => {
    if (searchText != "") {
      let filteredApps = employeeRequestedApplications.filter((val) => {
        if (val.name.toLowerCase().includes(searchText.toLowerCase())) {
          return val;
        }
      });
      setSearchRequestedApps(filteredApps);
    } else {
      setSearchRequestedApps(employeeRequestedApplications);
    }
  };

  const approveAppSearchFilter = (searchText) => {
    if (searchText != "") {
      let filteredApps = employeeApprovedApplications.filter((val) => {
        if (val.name.toLowerCase().includes(searchText.toLowerCase())) {
          return val;
        }
      });
      setSearchApprovedApps(filteredApps);
    } else {
      setSearchApprovedApps(employeeApprovedApplications);
    }
  };

  const abc = async () => {
    setPageLoader(true);
    employeeGrantedApplications.splice(0, employeeGrantedApplications.length);
    employeeRequestedApplications.splice(
      0,
      employeeRequestedApplications.length
    );
    employeeApprovedApplications.splice(0, employeeApprovedApplications.length);
    employeeRevokedApplications.splice(0, employeeRevokedApplications.length);
    employeeApplications.splice(0, employeeApplications.length);
    try {
      let empResponse = await GetEmployeeById(userData._id);
      empResponse = await empResponse.json();
      setEmployeeDetails(empResponse.Result[0]);
    } catch (error) {
    };
    try {
      let response = await GetEmployeeByMailId(userData._id);
      response = await response.json();
      setAccessId(response.Result[0]._id);
      if (response.Result[0].applications.length > 0) {
        setEmployeeApplications(response.Result[0].applications);
        response.Result[0].applications.map((app) => {
          if (app.requestState) {
            employeeRequestedApplications.push(app);
            searchRequestedApps.push(app);
          } else if (app.grantState) {
            employeeGrantedApplications.push(app);
            searchGrantedApps.push(app);
          } else if (app.revokeState) {
            employeeRevokedApplications.push(app);
          } else if (app.approveState) {
            employeeApprovedApplications.push(app);
            searchApprovedApps.push(app);
          } else {
          }
        });
        employeeRequestedApplications.map((item) => (item.checked = false));
        employeeGrantedApplications.map((item) => (item.checked = false));
        employeeRevokedApplications.map((item) => (item.checked = false));
        employeeApprovedApplications.map((item) => (item.checked = false));
      } else setEmployeeApplications("");
      getAllApps(response.Result[0].applications);
    } catch (error) {
    }
    setPageLoader(false);
  };

  const getAllApps = async (tempApps) => {
    apps.splice(0, apps.length);
    try {
      let applicationResponse = await GetApplications();
      applicationResponse = await applicationResponse.json();
      if (applicationResponse.Result.length > 0) {
        let res = applicationResponse.Result;
        for (let i = 0; i < res.length; i++) {
          for (let j = 0; j < tempApps.length; j++) {
            if (res[i]._id === tempApps[j]._id) {
              res[i].checked = true;
              resultArray.push(res[i]);
            }
          }
        }
        setApps(res);
      } else setApps("");
      setTimeout(() => {
        setPageLoader(false);
      }, 1000);
    } catch (error) {
    }
  };

  useEffect(() => {
    abc();
  }, []);

  const save = async (record) => {
    try {
      let response = await UpdateTemplate(record, record._id);
      response = await response.json();
      recordUpdateNotification();
    } catch (error) {
    }
  };

  const handleClose = () => {
    setModal(false);
    setResultArray([]);
    setConfirmBtnLoader(false);
    setChecked(false);
    setTableData([]);
    setValue([]);
    setTableValues([]);
  };

  const handleCloseGrantModal = () => {
    setResultArray([]);
    setChecked(false);
    let res = employeeGrantedApplications.map((appData) => {
      appData.checked = false;
      return appData;
    });
    setEmployeeGrantedApplications(res);
    setSearchGrantedApps([]);
    setGrantModal(false);
  };

  const handleCloseApproveModal = () => {
    setResultArray([]);
    setShowAction(false);
    setChecked(false);
    let res = employeeApprovedApplications.map((appData) => {
      appData.checked = false;
      return appData;
    });
    setEmployeeApprovedApplications(res);
    setSearchApprovedApps([]);
    setApproveModal(false);
  };

  const handleCloseRequestModal = () => {
    setShowAction(false);
    setResultArray([]);
    setChecked(false);
    let res = employeeRequestedApplications.map((appData) => {
      appData.checked = false;
      return appData;
    });
    setEmployeeRequestedApplications(res);
    setSearchRequestedApps([]);
    setRequestModal(false);
  };

  const ConfirmHandler = async (applicationDetails, x) => {
    try {
      let applicationResponse = await EmployeeApplicationAccess(
        applicationDetails,
        applicationDetails._id
      );
      applicationResponse = await applicationResponse.json();
      if (x == "Request") ShareTemplateNotification();
      else if (x == "Approve") ApproveNotification();
      else if (x == "Revoke") RevokeNotification();
      else if (x == "Grant") GrantNotification();
      setConfirmBtnLoader(false);
      setChecked(false);
      setTableData([]);
      setValue([]);
      setTableValues([]);
      getEmployeeByMailId();
    } catch (error) {
    }
  };

  const openModal = async () => {
    setModal(true);
    setRecommendedLoader(true);
    setSearchApps([]);
    setResultArray([]);
    let res = apps.map((appData) => {
      appData.checked = false;
      return appData;
    });
    setApps(res);
    setTimeout(() => {
      setRecommendedLoader(false);
    }, 1000);
  };

  const openGrantModal = async () => {
    setGrantModal(true);
    setSearchGrantedApps(employeeGrantedApplications);
    setRecommendedLoader(true);
    resultArray.splice(0, resultArray.length);
    setShowAction(false);
    setTimeout(() => {
      setRecommendedLoader(false);
    }, 1000);
  };

  const openApproveModal = async () => {
    setApproveModal(true);
    setSearchApprovedApps(employeeApprovedApplications);
    setRecommendedLoader(true);
    resultArray.splice(0, resultArray.length);
    setShowAction(true);
    setTimeout(() => {
      setRecommendedLoader(false);
    }, 1000);
  };

  const openRequestModal = async () => {
    setRequestModal(true);
    setSearchRequestedApps(employeeRequestedApplications);
    setRecommendedLoader(true);
    resultArray.splice(0, resultArray.length);
    setShowAction(true);
    setTimeout(() => {
      setRecommendedLoader(false);
    }, 1000);
  };

  const onRecommendedItemChecked = (item, e, mode) => {
    if (mode == "selectOne") {
      let res = apps.map((appData) => {
        if (appData._id === item._id) {
          appData.checked = e.target.checked;
        }
        return appData;
      });
      setApps(res);
      const result = apps.filter((appData) => {
        return appData.checked == true;
      });
      resultArray.splice(0, resultArray.length);
      resultArray.push(...result);
      if (result.length > 0) setDisabled(false);
      else setDisabled(true);
    }
  };

  const onGrantedItemChecked = (item, e, mode) => {
    if (mode == "selectOne") {
      let res = employeeGrantedApplications.map((appData) => {
        if (appData._id === item._id) {
          appData.checked = e.target.checked;
        }
        return appData;
      });
      setEmployeeGrantedApplications(res);
      const result = employeeGrantedApplications.filter((appData) => {
        return appData.checked == true;
      });
      resultArray.splice(0, resultArray.length);
      resultArray.push(...result);
      if (result.length > 0) setDisabled(false);
      else setDisabled(true);
    } else if (mode == "selectAll") {
      let check = e.target.checked;
      let res = employeeGrantedApplications.map((data) => {
        data.checked = check;
        return data;
      });
      setEmployeeGrantedApplications(res);
      const result = employeeGrantedApplications.filter((appData) => {
        return appData.checked == true;
      });
      setChecked(check);
      resultArray.splice(0, resultArray.length);
      resultArray.push(...result);
      if (result.length > 0) setDisabled(false);
      else setDisabled(true);
    }
  };

  const onApproveItemChecked = (item, e, mode) => {
    if (mode == "selectOne") {
      let res = employeeApprovedApplications.map((appData) => {
        if (appData._id === item._id) {
          appData.checked = e.target.checked;
        }
        return appData;
      });
      setEmployeeApprovedApplications(res);
      const result = employeeApprovedApplications.filter((appData) => {
        return appData.checked == true;
      });
      resultArray.splice(0, resultArray.length);
      resultArray.push(...result);
      if (result.length > 0) setDisabled(false);
      else setDisabled(true);
    } else if (mode == "selectAll") {
      let check = e.target.checked;
      let res = employeeApprovedApplications.map((data) => {
        data.checked = check;
        return data;
      });
      setEmployeeApprovedApplications(res);
      const result = employeeApprovedApplications.filter((appData) => {
        return appData.checked == true;
      });
      setChecked(check);
      resultArray.splice(0, resultArray.length);
      resultArray.push(...result);
      if (result.length > 0) setDisabled(false);
      else setDisabled(true);
    }
  };

  const onRequestedItemChecked = (item, e, mode) => {
    if (mode == "selectOne") {
      let res = employeeRequestedApplications.map((appData) => {
        if (appData._id === item._id) {
          appData.checked = e.target.checked;
        }
        return appData;
      });
      setEmployeeRequestedApplications(res);
      const result = employeeRequestedApplications.filter((appData) => {
        return appData.checked == true;
      });
      resultArray.splice(0, resultArray.length);
      resultArray.push(...result);
      if (result.length > 0) setDisabled(false);
      else setDisabled(true);
    } else if (mode == "selectAll") {
      let check = e.target.checked;
      let res = employeeRequestedApplications.map((data) => {
        data.checked = check;
        return data;
      });
      setEmployeeRequestedApplications(res);
      const result = employeeRequestedApplications.filter((appData) => {
        return appData.checked == true;
      });
      setChecked(check);
      resultArray.splice(0, resultArray.length);
      resultArray.push(...result);
      if (result.length > 0) setDisabled(false);
      else setDisabled(true);
    }
  };

  const handleSubmitRecommendedApplications = () => {
    const res = tableData.filter(
      (x) => !employeeApplications.some((y) => y._id === x.id)
    );
    let currentTimeSatamp = Date(Date.now().toString);
    let applicationDetails = {
      _id: accessId,
      applications: res.map((app) => {
        return {
          _id: app.id,
          name: app.app,
          status: "requested",
          requestState: true,
          requestedDate: currentTimeSatamp,
          approveState: false,
          approvedDate: "",
          grantState: false,
          grantedDate: "",
          revokeState: false,
          revokedDate: "",
        };
      }),
    };
    setModal(false);
    ConfirmHandler(applicationDetails, "Request");
    setModal(false);
  };

  const handleSubmitGrantApplications = () => {
    let currentTimeSatamp = Date(Date.now().toString);
    let applicationDetails = {
      _id: accessId,
      applications: resultArray.map((app) => {
        return {
          _id: app._id,
          name: app.name,
          status: "revoked",
          requestState: false,
          requestedDate:
            app.requestedDate !== undefined ? app.requestedDate : "",
          approveState: false,
          approvedDate: app.approvedDate !== undefined ? app.approvedDate : "",
          grantState: false,
          grantedDate: app.grantedDate !== undefined ? app.grantedDate : "",
          revokeState: true,
          revokedDate: currentTimeSatamp,
        };
      }),
    };
    setGrantModal(false);
    ConfirmHandler(applicationDetails, "Revoke");
    setModal(false);
  };

  const handleSubmitApproveApplications = () => {
    let currentTimeSatamp = Date(Date.now().toString);
    let applicationDetails = {
      _id: accessId,
      applications: resultArray.map((app) => {
        return {
          _id: app._id,
          name: app.name,
          status: selectedApproveAction != "Grant" ? "revoked" : "granted",
          requestState: false,
          requestedDate:
            app.requestedDate !== undefined ? app.requestedDate : "",
          approveState: false,
          approvedDate: app.approvedDate !== undefined ? app.approvedDate : "",
          grantState: selectedApproveAction === "Grant" ? true : false,
          grantedDate:
            selectedApproveAction === "Grant"
              ? currentTimeSatamp
              : app.grantedDate !== undefined
              ? app.grantedDate
              : "",
          revokeState: selectedApproveAction != "Grant" ? true : false,
          revokedDate:
            selectedApproveAction != "Grant"
              ? currentTimeSatamp
              : app.revokedDate !== undefined
              ? app.revokedDate
              : "",
        };
      }),
    };
    setApproveModal(false);
    let x = selectedApproveAction != "Grant" ? "Revoke" : "Grant";
    ConfirmHandler(applicationDetails, x);
    setModal(false);
  };

  const handleSubmitRequestApplications = () => {
    let currentTimeSatamp = Date(Date.now().toString);
    let applicationDetails = {
      _id: accessId,
      applications: resultArray.map((app) => {
        return {
          _id: app._id,
          name: app.name,
          status: selectedAction != "Approve" ? "revoked" : "approved",
          requestState: false,
          requestedDate:
            app.requestedDate !== undefined ? app.requestedDate : "",
          approveState: selectedAction === "Approve" ? true : false,
          approvedDate:
            selectedAction === "Approve"
              ? currentTimeSatamp
              : app.approvedDate !== undefined
              ? app.approvedDate
              : "",
          grantState: false,
          grantedDate: app.grantedDate !== undefined ? app.grantedDate : "",
          revokeState: selectedAction != "Approve" ? true : false,
          revokedDate:
            selectedAction != "Approve"
              ? currentTimeSatamp
              : app.revokedDate !== undefined
              ? app.revokedDate
              : "",
        };
      }),
    };
    setRequestModal(false);
    setShowAction(false);
    let x = selectedAction != "Approve" ? "Revoke" : "Approve";
    ConfirmHandler(applicationDetails, x);
    setModal(false);
  };

  const handleCrossDelete = (e, app) => {
    let resultingTemplateApps = employeeApplications.filter(
      (temApp) => temApp._id != app._id
    );
    setResultArray(resultingTemplateApps);
    setEmployeeApplications(resultingTemplateApps);
    let resultingApps = apps.map((appData) => {
      if (appData._id == app._id) {
        appData.checked = false;
      }
      return appData;
    });
    setApps(resultingApps);
  };

  let empDetails = {
    name: employeeDetails.fullname,
    mail: employeeDetails.mail,
    status: employeeDetails.status,
    type: employeeDetails.employmenttype,
    role: employeeDetails.role,
    startDate: employeeDetails.startdate,
  };

  const deleteFunc = (record) => {
    const res = tableData.filter((y) => {
      return y.app != record.app;
    });
    const tableRes = tableValues.filter((y) => {
      return y.label != record.app;
    });
    setTableValues(tableRes);
    setTableData(res);
  };
  const columns = [
    {
      title: "App",
      dataIndex: "app",
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => {
        return (
          <div>
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
          </div>
        );
      },
    },
  ];
  async function getApps(val) {
    if (val != "") {
      try {
        let appResponse = await GetApplicationByName(val);
        appResponse = await appResponse.json();
        if (appResponse.Result.length > 0) {
          let usersData = appResponse.Result.map((user) => ({
            label: user.name,
            value: user._id,
          }));
          return usersData;
        } else return [{ label: null }];
      } catch (error) {
      }
    }
  }
  var totalApps = [];
  const handleShare = async () => {
    tableValues.map((val) => {
      totalApps = [...totalApps, { app: val.label, id: val.value }];
    });
    setTableData(totalApps);
    setValue([]);
  };
  const handleSetValue = (values) => {
    setValue(values);
    values.map((val) => {
      var item = tableValues.find((item) => item.value === val.value);
      if (item == undefined) {
        tableValues.push(val);
      }
    });
  };

  const onClose = () => {
    setVisible(false);
  };

  const appDetails = async (app, emp) => {
    setApplication(app);
    try {
      let reqBody = {
        appId: app._id,
        empId: emp,
      };
      let response = await GetAppDetails(reqBody);
      response = await response.json();
      setVisible(true);
      let data = response.Result.length > 0 ? response.Result[0] : "";
      if (data != "") setSelectedApp(data);
      else {
        let details = {
          _id: "",
          appName: "",
          approvedDate: "",
          approver: "",
          grantedDate: "",
          requestedDate: "",
          revokedDate: "",
          team: "",
          status: "",
        };
        setSelectedApp(details);
      }
    } catch (error) {
    }
  };

  const RemainderMail = async () => {
    let reqBody = {};
    if (application.status == "requested") {
      reqBody = {
        toAddress: selectedApp.approver,
        subject: "Remainder:: Access Request -" + employeeDetails.fullname,
        message: `Hello, \n\nEmployee  ${employeeDetails.fullname} ${employeeDetails.mail} requested Access to ${selectedApp.appName}  Application. \n\n Please Approve.`,
      };
    } else if (application.status == "approved") {
      reqBody = {
        toAddress: selectedApp.team,
        subject: "Remainder:: Access Request -" + employeeDetails.fullname,
        message: `
          Hello, \n\nEmployee ${employeeDetails.fullname} ${employeeDetails.mail}  requested Access to ${selectedApp.appName} Application. Manager ${selectedApp.approver} approved the request.  \n\n Please Grant Access.`,
      };
    }
    try {
      let response = await RemainderEMail(reqBody);
      response = await response.json();
      if (response.Result == "remainder sent successfully") {
        RemainderNotification();
        setVisible(false);
      }
    } catch (error) {
    }
  };

  return (
    <div className="d-flex h-100">
      <section className="newEmployeeDeatils byEmployeeHomeDetail w-100 h-100">
        <div className="pl-3 my-4 mb-4">
          {pageLoader ? (
            <div className="text-center my-4 py-4">
              <i className="fas fa-spinner fa-2x fa-spin spinner spinnerTop"></i>
              <div className="loaderText mt-2">Loading Dashboard</div>
            </div>
          ) : (
            <>
              <div className="container">
                <div className="content-tabs">
                  <div className="content  active-content">
                    <div>
                      <div
                        className="chooseStyEmp mb-4"
                        style={{ marginTop: "2rem" }}
                      >
                        <div className="mainTitle">Employee Information</div>
                        <div className="mb-4 mt-3">
                          <form>
                            <div className="d-flex">
                              <div className="d-flex form-group col-md-4">
                                <label
                                  htmlFor="name"
                                  className="fontsize w-50"
                                  style={{ fontWeight: "600" }}
                                >
                                  Name
                                </label>
                                <Input
                                  size="large"
                                  className="form-control profFont"
                                  id="name"
                                  value={empDetails.name}
                                  disabled={true}
                                />
                              </div>
                              <div className="d-flex form-group col-md-4">
                                <label
                                  htmlFor="email"
                                  className="w-50 fontsize"
                                  style={{ fontWeight: "600" }}
                                >
                                  Email
                                </label>
                                <Input
                                  size="large"
                                  className="form-control profFont"
                                  id="email"
                                  value={empDetails.mail}
                                  disabled={true}
                                />
                              </div>
                              <div className="d-flex form-group col-md-4">
                                <label
                                  htmlFor="status"
                                  className="w-50 fontsize"
                                  style={{ fontWeight: "600" }}
                                >
                                  Status
                                </label>
                                <Input
                                  size="large"
                                  className="form-control profFont"
                                  id="status"
                                  value={empDetails.status}
                                  disabled={true}
                                />
                              </div>
                            </div>
                            <div className="d-flex">
                              <div className="form-group col-md-4 d-flex">
                                <label
                                  htmlFor="type"
                                  className="w-50 fontsize"
                                  style={{ fontWeight: "600" }}
                                >
                                  Type
                                </label>
                                <Select
                                  placeholder="Please select Type"
                                  value={empDetails.type}
                                  disabled={true}
                                  className="w-100"
                                >
                                  <Option value="Hardware">Hardware</Option>
                                  <Option value="Software">Software</Option>
                                </Select>
                              </div>
                              <div className="form-group col-md-4 d-flex">
                                <label
                                  htmlFor="role"
                                  className="w-50 fontsize"
                                  style={{ fontWeight: "600" }}
                                >
                                  Role
                                </label>
                                <Select
                                  value={empDetails.role}
                                  disabled={true}
                                  className="w-100"
                                >
                                  <Option value="Team Member">
                                    Team Member
                                  </Option>
                                  <Option value="Administrator">
                                    Administrator
                                  </Option>
                                  <Option value="Manager">Manager</Option>
                                </Select>
                              </div>
                              <div className="form-group col-md-4 d-flex">
                                <label
                                  htmlFor="startDate"
                                  className="w-50 fontsize"
                                  style={{ fontWeight: "600" }}
                                >
                                  Start Date
                                </label>
                                <DatePicker
                                  defaultValue={moment(
                                    empDetails.startDate,
                                    dateFormatList[0]
                                  )}
                                  format={dateFormatList}
                                  disabled={true}
                                  className="w-100 profFont"
                                />
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="mt-5 empDetailsSty mb-4">
                        <div className="mainTitle">Applications</div>
                        <div className="row flex-column ml-auto mr-auto">
                          <div className="mr-5 mt-3 mb-4">
                            <Button
                              type="primary"
                              className="float-right"
                              onClick={openModal}
                              style={{ width: "7%" }}
                            >
                              Add
                            </Button>
                          </div>

                          <Collapse accordion>
                            <Panel header="Requested" key="1">
                              <div className="float-left mt-4 ml-4">
                                {employeeRequestedApplications.map((app) => (
                                  <Select
                                    className="selectStyle"
                                    mode="tags"
                                    value={app.name}
                                    open={false}
                                    bordered={false}
                                    onDeselect={(e) =>
                                      handleCrossDelete(e, app)
                                    }
                                    onClick={() => {
                                      appDetails(app, employeeDetails._id);
                                      setShowRemainder(true);
                                    }}
                                  ></Select>
                                ))}
                              </div>
                              {/* <div className="mr-5">
                                <Button
                                  type="primary"
                                  className="float-right"
                                  onClick={openRequestModal}
                                  style={{ width: "7%" }}
                                >
                                  Action
                                </Button>
                              </div> */}
                            </Panel>
                            <Panel header="Approved" key="2">
                              <div className="float-left mt-4 ml-4">
                                {employeeApprovedApplications.map((app) => (
                                  <Select
                                    className="selectStyle"
                                    mode="tags"
                                    value={app.name}
                                    open={false}
                                    bordered={false}
                                    onDeselect={(e) =>
                                      handleCrossDelete(e, app)
                                    }
                                    onClick={() => {
                                      appDetails(app, employeeDetails._id);
                                      setShowRemainder(true);
                                    }}
                                  ></Select>
                                ))}
                              </div>
                              {/* <div className="mr-5">
                                <Button
                                  type="primary"
                                  className="float-right"
                                  onClick={openApproveModal}
                                  style={{ width: "7%" }}
                                >
                                  Action
                                </Button>
                              </div> */}
                            </Panel>
                            <Panel header="Granted" key="3">
                              <div className="float-left mt-4 ml-4">
                                {employeeGrantedApplications.map((app) => (
                                  <Select
                                    className="selectStyle"
                                    mode="tags"
                                    value={app.name}
                                    open={false}
                                    bordered={false}
                                    onDeselect={(e) =>
                                      handleCrossDelete(e, app)
                                    }
                                    onClick={() => {
                                      appDetails(app, employeeDetails._id);
                                      setShowRemainder(false);
                                    }}
                                  ></Select>
                                ))}
                              </div>
                              {/* <div className="mr-5">
                                <Button
                                  type="primary"
                                  className="float-right"
                                  onClick={openGrantModal}
                                  style={{ width: "7%" }}
                                >
                                  Revoke
                                </Button>
                              </div> */}
                            </Panel>
                            <Panel header="Revoked/Declined" key="4">
                              <div className="float-left mt-4 ml-4">
                                {employeeRevokedApplications.map((app) => (
                                  <Select
                                    className="selectStyle"
                                    mode="tags"
                                    value={app.name}
                                    open={false}
                                    bordered={false}
                                    onDeselect={(e) =>
                                      handleCrossDelete(e, app)
                                    }
                                    onClick={() => {
                                      appDetails(app, employeeDetails._id);
                                      setShowRemainder(false);
                                    }}
                                  ></Select>
                                ))}
                              </div>
                            </Panel>
                          </Collapse>
                          {/* <div className="mt-4">
                            <hr className="hrStyles" />
                            <div className="mainTitle">Requested</div>
                          </div> */}
                          {/* 
                          <div className="mt-4">
                            <hr className="hrStyles" />
                            <div className="mainTitle">Approved</div>
                          </div> */}

                          {/* <div className="mt-4">
                            <hr className="hrStyles" />
                            <div className="mainTitle">Granted</div>
                          </div> */}

                          {/* <div className="mt-4">
                            <hr className="hrStyles" />
                            <div className="mainTitle">Revoked/Declined</div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <EmployeeDetailsModal
                      visibility={modal}
                      handleClose={handleClose}
                      apps={apps}
                      recommendedLoader={recommendedLoader}
                      onRecommendedItemChecked={onRecommendedItemChecked}
                      handleSubmitRecommendedApplications={
                        handleSubmitRecommendedApplications
                      }
                      searchApps={searchApps}
                      searchFilter={searchFilter}
                      Checked={Checked}
                      getApps={getApps}
                      handleSetValue={handleSetValue}
                      handleShare={handleShare}
                      columns={columns}
                      value={value}
                      tableData={tableData}
                      from="ByEmployee"
                    />
                    {/* <GrantRevokeModal
                      visibility={approveModal}
                      title="Approved Applications"
                      handleClose={handleCloseApproveModal}
                      recommendedLoader={recommendedLoader}
                      onRecommendedItemChecked={onApproveItemChecked}
                      handleSubmitRecommendedApplications={
                        handleSubmitApproveApplications
                      }
                      searchApps={searchApprovedApps}
                      searchFilter={approveAppSearchFilter}
                      Checked={Checked}
                      requestActions={approveActions}
                      showAction={showAction}
                      selectedApproveAction={selectedApproveAction}
                      setSelectedApproveAction={setSelectedApproveAction}
                      from="ByEmployee"
                      fromModal="approve"
                    />
                    <GrantRevokeModal
                      visibility={grantModal}
                      title="Granted Applications"
                      handleClose={handleCloseGrantModal}
                      recommendedLoader={recommendedLoader}
                      onRecommendedItemChecked={onGrantedItemChecked}
                      handleSubmitRecommendedApplications={
                        handleSubmitGrantApplications
                      }
                      searchApps={searchGrantedApps}
                      searchFilter={grantAppSearchFilter}
                      Checked={Checked}
                      requestActions={requestActions}
                      showAction={showAction}
                      from="ByEmployee"
                      fromModal="grant"
                    />
                    <GrantRevokeModal
                      visibility={requestModal}
                      title="Requested Applications"
                      handleClose={handleCloseRequestModal}
                      recommendedLoader={recommendedLoader}
                      onRecommendedItemChecked={onRequestedItemChecked}
                      handleSubmitRecommendedApplications={
                        handleSubmitRequestApplications
                      }
                      searchApps={searchRequestedApps}
                      searchFilter={requestAppSearchFilter}
                      Checked={Checked}
                      requestActions={requestActions}
                      showAction={showAction}
                      selectedAction={selectedAction}
                      setSelectedAction={setSelectedAction}
                      from="ByEmployee"
                      fromModal="requested"
                    /> */}
                    {/* <Drawer
                      //   title=none
                      placement="right"
                      closable={false}
                      onClose={onClose}
                      visible={visible}
                      key="right"
                    ></Drawer> */}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
      <EmployeeSidebar selectedApp={selectedApp} RemainderMail={RemainderMail} showRemainder={showRemainder} visible={visible} onClose={onClose}/>
    </div>
  );
};

export default EmployeeHome;
