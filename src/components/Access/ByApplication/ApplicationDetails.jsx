import React, { useState, useEffect } from "react";
import "../access.scss";
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
} from "antd";
import { debounce, indexOf } from "lodash";
import { SaveTemplateNotification } from "../../common/Notifications/SaveNotifications";
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
import { GetEmployeeById, ShareApp } from "../../services/newEmployee.services";
import { GetEmployeeByMail, GetEmployees } from "../../services/setup.service";
import { ShareTemplateNotification } from "../../common/Notifications/ShareNotifications";
import moment from "moment";
import EmployeeDetailsModal from "../../common/Modal/EmployeeDetailsModal";
import GrantRevokeModal from "../../common/Modal/GrantRevokeModal";
import { EmployeeApplicationAccess } from "../../services/byEmployee.service";
import {
  ApplicationEmployeeAccess,
  GetApplicationById,
  GetEmployeesByApplication,
} from "../../services/byApplication.service";
import AccessApplicationModal from "../../common/Modal/AccessApplicaationModal";
import { GetApplications } from "../../services/application.service";

const { Search } = Input;
const { Content } = Layout;
const { Option } = Select;
const { Panel } = Collapse;

const ApplicationDetails = () => {
  const { applicationId } = useParams();
  const [items, setItems] = useState([]);
  const [pageLoader, setPageLoader] = useState(false);
  const [toggleState, setToggleState] = useState(1);
  const [apps, setApps] = useState([]);
  const [modal, setModal] = useState(false);
  const [grantModal, setGrantModal] = useState(false);
  const [requestModal, setRequestModal] = useState(false);
  const [confirmBtnLoader, setConfirmBtnLoader] = useState(false);
  const [recommendedLoader, setRecommendedLoader] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [resultArray, setResultArray] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [Checked, setChecked] = useState(false);
  const [employeeApplications, setEmployeeApplications] = useState([]);
  const [employeeGrantedApplications, setEmployeeGrantedApplications] =
    useState([]);
  const [employeeRequestedApplications, setEmployeeRequestedApplications] =
    useState([]);
  const [employeeApprovedApplications, setEmployeeApprovedApplications] =
    useState([]);
  const [employeeRevokedApplications, setEmployeeRevokedApplications] =
    useState([]);
  const [tableData, setTableData] = useState([]);
  const [value, setValue] = useState();
  const [tableValues, setTableValues] = useState([]);
  const [form] = Form.useForm();
  const [searchApps, setSearchApps] = useState([]);
  const [searchGrantedApps, setSearchGrantedApps] = useState([]);
  const [searchRequestedApps, setSearchRequestedApps] = useState([]);
  const dateFormatList = ["MM/DD/YYYY", "MM/DD/YY"];
  const [requestActions, setRequestActions] = useState(["Approve", "Deny"]);
  const [approveActions, setApproveActions] = useState(["Grant", "Deny"]);
  const [selectedAction, setSelectedAction] = useState("Approve");
  const [selectedApproveAction, setSelectedApproveAction] = useState("Grant");
  const [showAction, setShowAction] = useState(false);
  const [appId, setAppId] = useState("");
  const [applicationData, setApplicationData] = useState([]);
  const [sampleData, setSampleData] = useState([]);
  const [approveModal, setApproveModal] = useState(false);
  const [searchApprovedApps, setSearchApprovedApps] = useState([]);

  const searchFilter = (searchTxt) => {
    if (searchTxt != "") {
      let filteredApps = apps.filter((val) => {
        if (val.name.toLowerCase().includes(searchTxt.toLowerCase())) {
          ////console.log(val);
          return val;
        }
      });
      setSearchApps(filteredApps);
    } else {
      setSearchApps([]);
    }
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
      //console.log("Error", error);
    }
  };

  const grantAppSearchFilter = (searchText) => {
    if (searchText != "") {
      let filteredApps = employeeGrantedApplications.filter((val) => {
        if (val.username.toLowerCase().includes(searchText.toLowerCase())) {
          //console.log(val);
          return val;
        }
      });
      setSearchGrantedApps(filteredApps);
    } else {
      setSearchGrantedApps(employeeGrantedApplications);
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

  const requestAppSearchFilter = (searchText) => {
    if (searchText != "") {
      let filteredApps = employeeRequestedApplications.filter((val) => {
        if (val.username.toLowerCase().includes(searchText.toLowerCase())) {
          //console.log(val);
          return val;
        }
      });
      setSearchRequestedApps(filteredApps);
    } else {
      setSearchRequestedApps(employeeGrantedApplications);
    }
  };

  const getEmployeesByApplication = async () => {
    setPageLoader(true);
    employeeApprovedApplications.splice(0, employeeApprovedApplications.length);
    employeeGrantedApplications.splice(0, employeeGrantedApplications.length);
    employeeRequestedApplications.splice(
      0,
      employeeRequestedApplications.length
    );
    employeeRevokedApplications.splice(0, employeeRevokedApplications.length);
    employeeApplications.splice(0, employeeApplications.length);
    try {
      let response = await GetApplicationById(applicationId);
      response = await response.json();
      //console.log(response);
      setAppId(response.Result[0]._id);
      setApplicationData(response.Result[0]);
      // if (response.Result[0].applications.length > 0) {
      try {
        let empResponse = await GetEmployeesByApplication(
          response.Result[0]._id
        );
        empResponse = await empResponse.json();
        //console.log(empResponse);
        empResponse.Result.map((app) => {
          if (app.appStatus === "requested") {
            app.empDetails.map((item) => {
              item.accessId = app.accessId;
              employeeRequestedApplications.push(item);
              searchRequestedApps.push(item);
              employeeApplications.push(item);
            });
          } else if (app.appStatus === "granted") {
            app.empDetails.map((item) => {
              item.accessId = app.accessId;
              employeeGrantedApplications.push(item);
              searchGrantedApps.push(item);
              employeeApplications.push(item);
            });
          } else if (app.appStatus === "revoked") {
            app.empDetails.map((item) => {
              item.accessId = app.accessId;
              employeeRevokedApplications.push(item);
              employeeApplications.push(item);
            });
          } else if (app.appStatus === "approved") {
            app.empDetails.map((item) => {
              item.accessId = app.accessId;
              employeeApprovedApplications.push(item);
              searchApprovedApps.push(item);
              employeeApplications.push(item);
            });
          } else {
            //console.log("app", app);
          }
        });
        //console.log("employeeApprovedApplications",employeeApprovedApplications);
        employeeRequestedApplications.map((item) => (item.checked = false));
        employeeGrantedApplications.map((item) => (item.checked = false));
        employeeRevokedApplications.map((item) => (item.checked = false));
        employeeApprovedApplications.map((item) => (item.checked = false));
      } catch (error) {
        //console.log("Error", error);
      }
      setPageLoader(false);
      getAllApps(response.Result);
    } catch (error) {
      //console.log("Error", error);
    }
  };

  useEffect(() => {
    getEmployeesByApplication();
  }, []);

  const handleClose = () => {
    setModal(false);
    setResultArray([]);
    setConfirmBtnLoader(false);
    setChecked(false);
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

  const ConfirmHandler = async (applicationDetails) => {
    try {
      let employeeResponse = await ApplicationEmployeeAccess(
        applicationDetails,
        applicationDetails._id
      );
      employeeResponse = await employeeResponse.json();
      ShareTemplateNotification();
      setConfirmBtnLoader(false);
      setChecked(false);
      setTableData([]);
      setValue([]);
      setTableValues([]);
      getEmployeesByApplication();
    } catch (error) {
      //console.log("Error", error);
    }
  };

  const openModal = async () => {
    setModal(true);
    setRecommendedLoader(true);
    setResultArray([]);
    setSearchApps([]);
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
        if (appData._id === item._id) appData.checked = e.target.checked;
        return appData;
      });
      const result = apps.filter((appData) => {
        return appData.checked == true;
      });
      setApps(res);
      const filterResult = result.map((val) => {
        var item = resultArray.find((item) => item._id === val._id);
        if (item == undefined) {
          resultArray.push(val);
        }
      });
      resultArray.splice(0, resultArray.length);
      resultArray.push(...result);
      if (result.length > 0) setDisabled(false);
      else setDisabled(true);
    } else if (mode == "selectAll") {
      let check = e.target.checked;
      let res = apps.map((data) => {
        data.checked = check;
        return data;
      });
      setEmployees(res);
      setSearchApps(res);
      const result = apps.filter((appData) => {
        return appData.checked == true;
      });
      setChecked(check);
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

  const handleSubmitRecommendedApplications = async () => {
    const res = resultArray.filter((x) => {
      if (x._id !== applicationData._id) return x;
    });
    res.push(applicationData);
    let currentTimeSatamp = Date(Date.now().toString);
    let applicationDetails = {
      _id: appId,
      empMail: tableData.map((val) => {
        return val.mail;
      }),
      applications: res.map((app) => {
        return {
          _id: app._id,
          name: app.name,
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
    try {
      let employeeResponse = await ShareApp(applicationDetails);
      employeeResponse = await employeeResponse.json();
      ShareTemplateNotification();
      setConfirmBtnLoader(false);
      apps.map((appData) => {
        return (appData.checked = false);
      });
      setChecked(false);
      setTableData([]);
      setValue([]);
      setTableValues([]);
      setSearchApps([]);
      getEmployeesByApplication();
    } catch (error) {
      //console.log("Error", error);
    }
    setModal(false);
  };

  const handleSubmitGrantApplications = () => {
    let currentTimeSatamp = Date(Date.now().toString);
    let applicationDetails = {
      _id: appId,
      applications: resultArray.map((emp) => {
        //console.log(emp);
        return {
          accessId: emp.accessId,
          empId: emp._id,
          username: emp.username,
          status: "revoked",
          requestState: false,
          requestedDate:
            emp.requestedDate !== undefined ? emp.requestedDate : "",
          approveState: false,
          approvedDate: emp.approvedDate !== undefined ? emp.approvedDate : "",
          grantState: false,
          grantedDate: emp.grantedDate !== undefined ? emp.grantedDate : "",
          revokeState: true,
          revokedDate: currentTimeSatamp,
        };
      }),
    };
    //console.log("handleSubmitGrantApplications", applicationDetails);
    setGrantModal(false);
    ConfirmHandler(applicationDetails);
    setModal(false);
  };

  const handleSubmitApproveApplications = () => {
    let currentTimeSatamp = Date(Date.now().toString);
    let applicationDetails = {
      _id: appId,
      applications: resultArray.map((emp) => {
        //console.log(emp);
        return {
          accessId: emp.accessId,
          empId: emp._id,
          username: emp.username,
          status: selectedApproveAction != "Grant" ? "revoked" : "granted",
          requestState: false,
          requestedDate:
            emp.requestedDate !== undefined ? emp.requestedDate : "",
          approveState: false,
          approvedDate: "",
          grantState: selectedApproveAction === "Grant" ? true : false,
          grantedDate:
            selectedApproveAction === "Grant"
              ? currentTimeSatamp
              : emp.grantedDate !== undefined
              ? emp.grantedDate
              : "",
          revokeState: selectedApproveAction != "Grant" ? true : false,
          revokedDate:
            selectedApproveAction != "Grant"
              ? currentTimeSatamp
              : emp.revokedDate !== undefined
              ? emp.revokedDate
              : "",
        };
      }),
    };
    // //console.log("handleSubmitApproveApplications", applicationDetails);
    setApproveModal(false);
    ConfirmHandler(applicationDetails);
    setModal(false);
  };

  const handleSubmitRequestApplications = () => {
    let currentTimeSatamp = Date(Date.now().toString);
    let applicationDetails = {
      _id: appId,
      applications: resultArray.map((emp) => {
        return {
          accessId: emp.accessId,
          empId: emp._id,
          username: emp.username,
          status: selectedAction != "Approve" ? "revoked" : "approved",
          requestState: false,
          requestedDate:
            emp.requestedDate !== undefined ? emp.requestedDate : "",
          approveState: selectedAction === "Approve" ? true : false,
          approvedDate:
            selectedAction === "Approve"
              ? currentTimeSatamp
              : emp.approvedDate !== undefined
              ? emp.approvedDate
              : "",
          grantState: false,
          grantedDate: "",
          revokeState: selectedAction != "Approve" ? true : false,
          revokedDate:
            selectedAction != "Approve"
              ? currentTimeSatamp
              : emp.revokedDate !== undefined
              ? emp.revokedDate
              : "",
        };
      }),
    };
    setRequestModal(false);
    setShowAction(false);
    // //console.log("handleSubmitRequestApplications", applicationDetails);
    ConfirmHandler(applicationDetails);
    setModal(false);
  };

  const handleCrossDelete = (e, app, state) => {
    //console.log("app", app, state);
    if (state == "granted") {
      let resultingGrantedEmployees = employeeGrantedApplications.filter(
        (temApp) => temApp._id != app._id
      );
      setEmployeeGrantedApplications(resultingGrantedEmployees);
      var res = employeeGrantedApplications.filter(function (n) {
        return !this.has(n);
      }, new Set(resultingGrantedEmployees));
      employeeRevokedApplications.push(res);
    }
    // let resultingTemplateApps = employeeApplications.filter(
    //   (temApp) => temApp._id != app._id
    // );
    // setResultArray(resultingTemplateApps);
    // setEmployeeApplications(resultingTemplateApps);
    // let resultingApps = employees.map((appData) => {
    //   if (appData._id == app._id) {
    //     appData.checked = false;
    //   }
    //   return appData;
    // });
    // setEmployees(resultingApps);
  };

  let empDetails = {
    name: applicationData.name,
    teamMail: applicationData.teamMail,
    approverMail: applicationData.approverMail,
    type: applicationData.type,
    env: applicationData.env,
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

  const columns = [
    {
      title: "Name",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "mail",
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => {
        return (
          <div>
            <Typography.Link
              onClick={() => {
                // deleteFunc(record);
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

  async function getUsers(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      let userResponse = await GetEmployeeByMail(email);
      userResponse = await userResponse.json();
      let usersData = userResponse.Result.map((user) => ({
        label: user.username,
        value: user.mail,
      }));
      return usersData;
    }
  }

  var userEmails = [];
  const handleShare = async () => {
    tableValues.map((val) => {
      userEmails = [...userEmails, { username: val.label, mail: val.value }];
    });
    setTableData(userEmails);
    setValue([]);
  };
  const handleSetValue = (values) => {
    //console.log(values);
    //console.log(employeeApplications);
    setValue(values);
    values.map((val) => {
      var item = tableValues.find((item) => item.value === val.value);
      if (item == undefined) {
        tableValues.push(val);
      }
    });
  };

  return (
    <div>
      <section className="newEmployee byEmployeeDetails h-100">
        <div className="pl-3 my-4 mb-4">
          {pageLoader ? (
            <div className="text-center my-4 py-4">
              <i className="fas fa-spinner fa-2x fa-spin spinner spinnerTop"></i>
              <div className="loaderText mt-2">
                Fetching Application Details
              </div>
            </div>
          ) : (
            <>
              <div className="container">
                <div className="content-tabs">
                  <div className="content  active-content">
                    <div>
                      <div className="d-flex mb-4">
                        <Link
                          className="mt-2 w text-decoration-none"
                          to={"/itaccess/access/by-application"}
                        >
                          <Tooltip
                            placement="leftTop"
                            title="Go Back"
                            arrowPointAtCenter
                          >
                            <span>
                              <span className="material-icons-outlined">
                                arrow_back
                              </span>
                            </span>
                          </Tooltip>
                        </Link>
                        <div className="ml-3 text-capitalize tname">
                          {applicationData.name}
                        </div>
                      </div>
                      <div
                        className="chooseStyEmp mb-4"
                        style={{ marginTop: "2rem" }}
                      >
                        <div className="mainTitle">Application Information</div>
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
                                  Team
                                </label>
                                <Input
                                  size="large"
                                  className="form-control profFont"
                                  id="email"
                                  value={empDetails.teamMail}
                                  disabled={true}
                                />
                              </div>
                              <div className="d-flex form-group col-md-4">
                                <label
                                  htmlFor="status"
                                  className="w-50 fontsize"
                                  style={{ fontWeight: "600" }}
                                >
                                  Approver
                                </label>
                                <Input
                                  size="large"
                                  className="form-control profFont"
                                  id="status"
                                  value={empDetails.approverMail}
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
                                  Environment
                                </label>
                                <Select
                                  value={empDetails.env}
                                  disabled={true}
                                  className="w-100"
                                >
                                  <Option value="Dev">Dev</Option>
                                  <Option value="QA">QA</Option>
                                  <Option value="PROD">PROD</Option>
                                </Select>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="mt-5 empDetailsSty mb-4">
                        <div className="mainTitle">Employees</div>
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
                                    className="selectStylesCls"
                                    mode="tags"
                                    value={app.username}
                                    open={false}
                                    bordered={false}
                                    onDeselect={(e) =>
                                      handleCrossDelete(e, app, "requested")
                                    }
                                  ></Select>
                                ))}
                              </div>
                              <div className="mr-5">
                                <Button
                                  type="primary"
                                  className="float-right"
                                  onClick={openRequestModal}
                                  style={{ width: "7%" }}
                                >
                                  Action
                                </Button>
                              </div>
                            </Panel>
                            <Panel header="Approved" key="2">
                              <div className="float-left mt-4 ml-4">
                                {employeeApprovedApplications.map((app) => (
                                  <Select
                                    className="selectStylesCls"
                                    mode="tags"
                                    value={app.username}
                                    open={false}
                                    bordered={false}
                                    onDeselect={(e) =>
                                      handleCrossDelete(e, app, "requested")
                                    }
                                  ></Select>
                                ))}
                              </div>
                              <div className="mr-5">
                                <Button
                                  type="primary"
                                  className="float-right"
                                  onClick={openApproveModal}
                                  style={{ width: "7%" }}
                                >
                                  Action
                                </Button>
                              </div>
                            </Panel>
                            <Panel header="Granted" key="3">
                              <div className="float-left mt-4 ml-4">
                                {employeeGrantedApplications.map((app) => (
                                  <Select
                                    className="selectStylesCls"
                                    mode="tags"
                                    value={app.username}
                                    open={false}
                                    bordered={false}
                                    onDeselect={(e) =>
                                      handleCrossDelete(e, app, "granted")
                                    }
                                  ></Select>
                                ))}
                              </div>
                              <div className="mr-5">
                                <Button
                                  type="primary"
                                  className="float-right"
                                  onClick={openGrantModal}
                                  style={{ width: "7%" }}
                                >
                                  Revoke
                                </Button>
                              </div>
                            </Panel>
                            <Panel header="Revoked/Declined" key="4">
                              <div className="float-left mt-4 ml-4">
                                {employeeRevokedApplications.map((item) => (
                                  <Select
                                    className="selectStylesCls"
                                    mode="tags"
                                    value={item.username}
                                    open={false}
                                    bordered={false}
                                    onDeselect={(e) =>
                                      handleCrossDelete(e, item, "revoked")
                                    }
                                  ></Select>
                                ))}
                              </div>
                            </Panel>
                          </Collapse>
                          {/* <div className="mt-4">
                            <hr className="hrStyles" />
                            <div className="mainTitle">Requested</div>
                          </div> */}
                          {/* <div className="mt-4">
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
                    <AccessApplicationModal
                      visibility={modal}
                      handleClose={handleClose}
                      apps={employees}
                      recommendedLoader={recommendedLoader}
                      onRecommendedItemChecked={onRecommendedItemChecked}
                      handleSubmitRecommendedApplications={
                        handleSubmitRecommendedApplications
                      }
                      searchApps={searchApps}
                      searchFilter={searchFilter}
                      Checked={Checked}
                      from="ByApplication"
                      getUsers={getUsers}
                      value={value}
                      handleSetValue={handleSetValue}
                      handleShare={handleShare}
                      form={form}
                      columns={columns}
                      tableData={tableData}
                    />
                    <GrantRevokeModal
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
                      from="ByApplication"
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
                      from="ByApplication"
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
                      from="ByApplication"
                      fromModal="requested"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ApplicationDetails;
