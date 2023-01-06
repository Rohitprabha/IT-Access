import React, { useState, useEffect } from "react";
import "../access.scss";
import { Button, Input, List, Layout, Empty, Form, Select } from "antd";
import { debounce } from "lodash";
import { GetApplications } from "../../services/application.service";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { NoEmployeeNotification } from "../../common/Notifications/AlertNotifications";
import { GetEmployeeByMail } from "../../services/setup.service";
import { GetEmployeeByName } from "../../services/byEmployee.service";
import { GetApplicationName } from "../../services/byApplication.service";

const { Search } = Input;

const { Content } = Layout;

const ByApplication = () => {
  const path = window.location.pathname.split("/");
  const template = path[3];
  const nextName = path[4];
  const [items, setItems] = useState([]);
  const [applications, setApplications] = useState([]);
  const [pageLoader, setPageLoader] = useState(false);
  const [apps, setApps] = useState([]);
  const [form] = Form.useForm();
  const location = useLocation();

  const getAllApps = async () => {
    setPageLoader(true);
    apps.splice(0, apps.length);
    setItems([]);
    setApplications([]);
    if (template === "by-application" && nextName === undefined) {
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

  const searchApplicationName = (async (val) => {
    if (val !== "") {
      try {
        let response = await GetApplicationName(val);
        response = await response.json();
        if (response.Result && response.Result.length > 0) {
          setApplications(response.Result);
        } else {
          setApplications([]);
          NoEmployeeNotification();
        }
      } catch (error) {
        //console.log("Error", error);
      }
    } else {
      setApplications([]);
    }
  });

  useEffect(() => {
    getAllApps();
  }, [location]);

  return (
    <div>
      {template === "by-application" && nextName === undefined ? (
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
                        By-Application
                      </div>
                      <div className="chooseSty mt-4 mb-4">
                        <div className="mainTitle">Search</div>
                        <div className="">
                          <div className="d-flex float-right mb-4 w-25">
                            <Search
                              allowClear
                              size="large"
                              onSearch={searchApplicationName}
                              placeholder="Application Name"
                              className="mr-3"
                            />
                          </div>
                        </div>
                      </div>
                      {applications.length > 0 ? (
                        <div className="chooseSty mt-4 mb-4">
                          <div className="mainTitle">Results</div>
                          <div className="row">
                            <div className="col-sm">
                              <div className="applicationData">
                                {applications.length > 0 ? (
                                  <List
                                    itemLayout="horizontal"
                                    dataSource={applications}
                                    className={
                                      applications.length == 0
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
                                              "/itaccess/access/by-application/" +
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

export default ByApplication;
