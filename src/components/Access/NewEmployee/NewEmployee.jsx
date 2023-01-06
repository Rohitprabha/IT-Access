import React, { useState, useEffect } from "react";
import "../access.scss";
import { Button, Input, List, Layout, Empty, Form, Select } from "antd";
import { debounce } from "lodash";
import { GetApplications } from "../../services/application.service";
import { GetTemplateByName } from "../../services/template.service";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { GetTemplateByEmail } from "../../services/newEmployee.services";
import { NoEmployeeNotification } from "../../common/Notifications/AlertNotifications";

const { Search } = Input;

const { Content } = Layout;

const NewEmployee = () => {
  const path = window.location.pathname.split("/");
  const template = path[3];
  const nextName = path[4];
  const { templateId } = useParams();
  const [items, setItems] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [pageLoader, setPageLoader] = useState(false);
  const [apps, setApps] = useState([]);
  const [val, setVal] = useState("");
  const [tVal, setTVal] = useState("");
  const [form] = Form.useForm();
  const location = useLocation();

  // const getAllTemplates = async () => {
  //   setPageLoader(true);
  //   items.splice(0, items.length);
  //   try {
  //     let response = await GetTemplates();
  //     response = await response.json();
  //     if (response.Result.length > 0) {
  //       setItems(response.Result);
  //     } else setItems("");
  //   } catch (error) {
  //     //console.log("Error", error);
  //   }
  // };

  const getAllApps = async () => {
    setPageLoader(true);
    apps.splice(0, apps.length);
    // items.splice(0, items.length);
    setItems([]);
    setEmployees([]);
    if (template === "new-employee" && nextName === undefined) {
      try {
        let applicationResponse = await GetApplications();
        applicationResponse = await applicationResponse.json();
        if (applicationResponse.Result.length > 0) {
          //console.log(applicationResponse.Result);
          setApps(applicationResponse.Result);
        } else setApps("");
        setTimeout(() => {
          setPageLoader(false);
        }, 1000);
      } catch (error) {
        //console.log("Error", error);
      }
    }
  };

  const searchTemplate = (async (val) => {
    setVal("");
    // let val = e.target.value;
    if (val !== "") {
      try {
        let response = await GetTemplateByName(val);
        response = await response.json();
        if (response.Result && response.Result.length > 0) {
          setItems(response.Result);
          setEmployees([]);
        }
        else {
      setItems([]);
      setEmployees([]);
          NoEmployeeNotification();
        }
      } catch (error) {
        //console.log("Error", error);
      }
    } else {
    setItems([]);
      setEmployees([]);
    }
  });

  const searchExistingEmail = (async (val) => {
    setTVal("");
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (val !== "" && val.match(mailformat)) {
      try {
        let response = await GetTemplateByEmail(val);
        response = await response.json();
        if (response.Result && response.Result.length > 0){
          setEmployees(response.Result);
        setItems([]);
      }
        else {
          setEmployees([]);
          NoEmployeeNotification();
          setItems([]);
        }
      } catch (error) {
        //console.log("Error", error);
      }
    } else {
      setEmployees([]);
      setItems([]);
    }
  });

  useEffect(() => {
    // getAllTemplates();
    setVal("");
    setTVal("");
    getAllApps();
  }, [location]);

  // const toggleTab = (index) => {
  //   setToggleState(index);
  // };

  return (
    <div>
      {template === "new-employee" && nextName === undefined ? (
        <section className="newEmployee h-100">
          <div className="pl-3 my-4 mb-4">
            {pageLoader ? (
              <div className="text-center my-4 py-4">
                <i className="fas fa-spinner fa-2x fa-spin spinner spinnerTop"></i>
                <div className="loaderText mt-2">Fetching</div>
              </div>
            ) : (
              <>
                <div className="container">
                  <div className="content-tabs">
                    <div className="content  active-content d-flex flex-column">
                      <div
                        className="mb-3"
                        style={{ fontSize: "1rem", color: "#00aae7" }}
                      >
                        New-Employee
                      </div>
                      <div className="chooseSty mt-4 mb-4">
                        <div className="mainTitle">Search</div>
                        <div
                          className="d-flex justify-content-center"
                          style={{ marginTop: "2%", marginBottom: "3%" }}
                        >
                          <Search
                            allowClear
                            size="large"
                            value={val}
                            onChange={(e) => {
                              setVal(e.target.value);
                              setTVal("");
                              setItems([]);
                            }}
                            onSearch={searchExistingEmail}
                            placeholder="Existing employee email"
                            className="mr-5 w-25"
                          />
                          <div className="orSty">(OR)</div>
                          <Search
                            allowClear
                            size="large"
                            value={tVal}
                            onChange={(e) => {
                              setTVal(e.target.value);
                              setVal("");
                              setEmployees([]);
                              // searchTemplate(e);
                            }}
                            onSearch={searchTemplate}
                            placeholder="Template Name"
                            className="ml-5 w-25"
                          />
                        </div>
                      </div>
                      {items.length > 0 ? (
                        <div className="chooseSty mt-4 mb-4">
                          <div className="mainTitle">
                            Template Search Results
                          </div>
                          <div className="row">
                            <div className="col-sm">
                              <div className="applicationData">
                                {items.length > 0 ? (
                                  <List
                                    itemLayout="horizontal"
                                    dataSource={items}
                                    className={
                                      items.length == 0
                                        ? "listBodyStyle"
                                        : "listBodyStyle listBodyOverflow"
                                    }
                                    renderItem={(item) => (
                                      <List.Item
                                        className="justify-content-center"
                                        style={{ fontSize: "1rem" }}
                                      >
                                        <Link
                                          className="linkStyle"
                                          to={{
                                            pathname:
                                              "/itaccess/access/new-employee/" +
                                              item._id,
                                            state: { item },
                                          }}
                                        >
                                          {item.name}
                                        </Link>
                                      </List.Item>
                                    )}
                                  />
                                ) : (
                                  <div className="col-12">
                                    <Empty
                                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                                      description="No Applications"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* </div> */}
                        </div>
                      ) : null}
                      {employees.length > 0 ? (
                        <div className="chooseSty mt-4 mb-4">
                          <div className="mainTitle">
                            Employee Search Results
                          </div>
                          <div className="row">
                            <div className="col-sm">
                              <div className="applicationData">
                                {employees.length > 0 ? (
                                  <List
                                    itemLayout="horizontal"
                                    dataSource={employees}
                                    className={
                                      employees.length == 0
                                        ? "listBodyStyle"
                                        : "listBodyStyle listBodyOverflow"
                                    }
                                    renderItem={(item) => (
                                      <List.Item
                                        className="justify-content-center"
                                        style={{ fontSize: "1rem" }}
                                      >
                                        <Link
                                          className="linkStyle"
                                          to={{
                                            pathname:
                                              "/itaccess/access/employee/" +
                                              item._id,
                                            state: { item },
                                          }}
                                        >
                                          {item.username}
                                        </Link>
                                      </List.Item>
                                    )}
                                  />
                                ) : (
                                  <div className="col-12">
                                    <Empty
                                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                                      description="No Employees Found"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                          {/* </div> */}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      ) : (
        <Content
          className="site-layout-background"
          style={{
            margin: 0,
            height: "auto",
            // overflowY: "auto",
          }}
        >
          <Outlet />
        </Content>
      )}
    </div>
  );
};

export default NewEmployee;
