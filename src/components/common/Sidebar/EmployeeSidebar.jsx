import React, { useEffect } from "react";
import { Layout, Menu, Input, Button } from "antd";
import "./EmployeeSidebar.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { resolveUserData } from "../../services/configs";
import moment from "moment";

const { SubMenu } = Menu;
const { Sider } = Layout;

const EmployeeSidebar = (props) => {
  const path = window.location.pathname.split("/");
  var nlpApps = path[1];
  var pathId = path[2];
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = React.useState([]);
  const [openAccessKeys, setOpenAccessKeys] = React.useState([]);
  const userData = resolveUserData();

  const rootMenuKeys = ["sub"];
  const rootAccessMenuKeys = ["sub1"];

  const onOpenChange = (keys) => {
    if (!collapsed) {
      const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
      if (rootMenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys);
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      }
    }
  };

  const onOpenChangeAccess = (keys) => {
    if (!collapsed) {
      const latestOpenKey = keys.find(
        (key) => openAccessKeys.indexOf(key) === -1
      );
      if (rootAccessMenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenAccessKeys(keys);
      } else {
        setOpenAccessKeys(latestOpenKey ? [latestOpenKey] : []);
      }
    }
  };

  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (pathId == undefined) {
      setOpenKeys([]);
      setOpenAccessKeys([]);
      }
      if (props.visible) {
          setCollapsed(true);
      }
  }, [location, pathId]);

  const navigateToNext = (app) => {
    navigate(app);
  };

  const mouseInEventHandler = (e) => {
    setCollapsed(false);
  };

  const mouseOutEventHandler = (e) => {
    setCollapsed(true);
  };

  const CustomAvatarForAccess = () => {
    return (
      <div
        className={
          collapsed
            ? "customAvatarCollapsed hoverStyle"
            : "customAvatar hoverStyle"
        }
      >
        <div className="material-icons-outlined ml-2 accessIcon">
          accessibility_new
        </div>
      </div>
    );
  };

  const CustomAvatar = () => {
    return (
      <div
        className={
          collapsed
            ? "customAvatarCollapsed hoverStyle"
            : "customAvatar hoverStyle"
        }
      >
        <div class="material-icons-outlined ml-1 homeIcon">phonelink_setup</div>
      </div>
    );
  };

  return (
    <>
      {userData.role && userData.role == "Team Member" ? (
        <>
          {props.visible ? (
            <section
              className="empsidebar h-100 d-flex"
              // onMouseEnter={mouseInEventHandler}
              // onMouseLeave={mouseOutEventHandler}
            >
              <Sider
                trigger={null}
                theme="light"
                collapsible
                // collapsed={collapsed}
                width={350}
                className="site-layout-background h-100 ml-4"
                style={{ color: "black", background: "white" }}
              >
                <diV className="mt-4">
                  <div>
                    <b style={{ fontSize: "1.5rem" }}>
                      {props.selectedApp.appName}
                    </b>
                  </div>
                  <div className="mt-2">
                    <b style={{ fontSize: "1.5rem" }}>
                      {props.selectedApp.status != undefined
                        ? props.selectedApp.status
                        : props.selectedApp.status}
                    </b>
                  </div>
                </diV>
                <diV className="mt-4">
                  <span>Requested On:</span>

                  <span className="ml-3">
                    {props.selectedApp.requestedDate != "" &&
                      moment(props.selectedApp.requestedDate).format(
                        "MM-DD-YYYY"
                      )}
                  </span>
                </diV>
                <diV>
                  <span>Approved On:</span>

                  <span className="ml-3">
                    {props.selectedApp.approvedDate != "" &&
                      moment(props.selectedApp.approvedDate).format(
                        "MM-DD-YYYY"
                      )}
                  </span>
                </diV>
                <diV>
                  <span>Approved By:</span>
                  <span className="ml-3">{props.selectedApp.approver}</span>
                </diV>
                <diV>
                  <span>Granted On:</span>
                  <span className="ml-3">
                    {props.selectedApp.grantedDate != "" &&
                      moment(props.selectedApp.grantedDate).format(
                        "MM-DD-YYYY"
                      )}
                  </span>
                </diV>
                <diV>
                  <span>Application URL:</span>
                </diV>
                <diV>
                  <span>Documentation:</span>
                </diV>
                <diV>
                  <span>Revoke/Declined On:</span>
                  <span className="ml-3">
                    {props.selectedApp.revokedDate != "" &&
                      moment(props.selectedApp.revokedDate).format(
                        "MM-DD-YYYY"
                      )}
                  </span>
                </diV>
                <diV>
                  <span>Pending With:</span>
                  <span className="ml-3">{props.selectedApp.team}</span>
                </diV>
                {props.showRemainder && (
                  <div style={{ textAlign: "center" }}>
                    <Button
                      type="primary"
                      className="mt-5"
                      onClick={() => {
                        props.RemainderMail();
                      }}
                    >
                      Remainder
                    </Button>
                  </div>
                )}
                {/* <div
                className={
                  collapsed
                    ? "logoCollapsed text-center"
                    : "logoStyle text-center"
                }
              ></div>
              <div
                className={
                  collapsed
                    ? "mt-1 position-relative scrollHeight d-flex flex-column"
                    : "mt-1 position-relative scrollHeight"
                }
              >
                <div className={collapsed ? "subBlockCollapsed" : "w-100"}>
                  <Link to={"/itaccess"} className="linkSty">
                    <div
                      className={
                        collapsed
                          ? "subTitle mt-2 d-flex"
                          : "subTitle mt-2 ml-3 d-flex"
                      }
                    >
                      <div
                        className={
                          collapsed
                            ? "fas fa-home ml-2 homeIcon"
                            : "fas fa-home ml-2 homeIcon"
                        }
                      ></div>
                      {collapsed ? null : (
                        <div className="ml-3" style={{ marginTop: "1px" }}>
                          Home
                        </div>
                      )}
                    </div>
                  </Link>
                  <div
                    className={
                      collapsed
                        ? "subTitle mt-4 d-flex"
                        : "subTitle mt-3 d-flex"
                    }
                  >
                    {collapsed ? (
                      <div
                        className={
                          collapsed
                            ? "material-icons-outlined ml-2 accessIcon"
                            : "material-icons-outlined accessIcon"
                        }
                      >
                        accessibility_new
                      </div>
                    ) : (
                      <Menu
                        key="13"
                        mode="inline"
                        className=" text-decoration-none searchMenuStyle mt-1"
                        openKeys={openAccessKeys}
                        onOpenChange={onOpenChangeAccess}
                        defaultSelectedKeys={pathId != undefined ? pathId : ""}
                        style={{
                          width: 400,
                        }}
                      >
                        <SubMenu
                          key={"sub1"}
                          title={"Access"}
                          icon={<CustomAvatarForAccess />}
                          className="text-decoration-none text-capitalize "
                          // onTitleClick={() =>
                          //   navigateToNext("/itaccess/access/new-employee")
                          // }
                        >
                          <Menu.Item
                            key={"employee"}
                            className={
                              collapsed ? "d-none" : "submenu-ItemStyle"
                            }
                          >
                            <Link
                              to={"/itaccess/access/new-employee"}
                              className="text-decoration-none"
                            >
                              New Employee
                            </Link>
                          </Menu.Item>
                          <Menu.Item
                            key={"application"}
                            className={
                              collapsed
                                ? "d-none"
                                : "text-decoration-none submenu-ItemStyle"
                            }
                          >
                            <Link
                              to={"/itaccess/access/by-employee"}
                              className="text-decoration-none"
                            >
                              By Employee
                            </Link>
                          </Menu.Item>
                          <Menu.Item
                            key={"template"}
                            className={
                              collapsed
                                ? "d-none"
                                : "text-decoration-none submenu-ItemStyle"
                            }
                          >
                            <Link
                              to={"/itaccess/access/by-application"}
                              className="text-decoration-none"
                            >
                              By Application
                            </Link>
                          </Menu.Item>
                        </SubMenu>
                      </Menu>
                    )}
                  </div>
                  <div
                    className={
                      collapsed
                        ? "subTitle mt-4 d-flex"
                        : "subTitle mt-1 d-flex"
                    }
                  >
                    {collapsed ? (
                      <div
                        className={
                          collapsed
                            ? "material-icons-outlined setupIcon ml-2"
                            : "material-icons-outlined"
                        }
                      >
                        phonelink_setup
                      </div>
                    ) : (
                      <Menu
                        key="13"
                        mode="inline"
                        className=" text-decoration-none searchMenuStyle mt-1"
                        openKeys={openKeys}
                        onOpenChange={onOpenChange}
                        defaultSelectedKeys={pathId != undefined ? pathId : ""}
                        style={{
                          width: 400,
                        }}
                      >
                        <SubMenu
                          key={"sub"}
                          title={"Setup"}
                          icon={<CustomAvatar />}
                          className="text-decoration-none text-capitalize "
                          // onTitleClick={() =>
                          //   navigateToNext("/itaccess/setup/employee")
                          // }
                        >
                          <Menu.Item
                            key={"employee"}
                            className={
                              collapsed ? "d-none" : "submenu-ItemStyle"
                            }
                          >
                            <Link
                              to={"/itaccess/setup/employee"}
                              className="text-decoration-none"
                            >
                              Employee
                            </Link>
                          </Menu.Item>
                          {userData.role &&
                          (userData.role === "administrator" ||
                            userData.role === "Administrator") ? (
                            <>
                              <Menu.Item
                                key={"application"}
                                className={
                                  collapsed
                                    ? "d-none"
                                    : "text-decoration-none submenu-ItemStyle"
                                }
                              >
                                <Link
                                  to={"/itaccess/setup/application"}
                                  className="text-decoration-none"
                                >
                                  Application
                                </Link>
                              </Menu.Item>
                            </>
                          ) : null}
                          <Menu.Item
                            key={"template"}
                            className={
                              collapsed
                                ? "d-none"
                                : "text-decoration-none submenu-ItemStyle"
                            }
                          >
                            <Link
                              to={"/itaccess/setup/template"}
                              className="text-decoration-none"
                            >
                              Template
                            </Link>
                          </Menu.Item>
                          {userData.role &&
                          (userData.role === "administrator" ||
                            userData.role === "Administrator") ? (
                            <>
                              <Menu.Item
                                key={"connectors"}
                                className={
                                  collapsed
                                    ? "d-none"
                                    : "text-decoration-none submenu-ItemStyle"
                                }
                              >
                                <Link
                                  to={"/itaccess/setup/connectors"}
                                  className="text-decoration-none"
                                >
                                  Connectors
                                </Link>
                              </Menu.Item>
                            </>
                          ) : null}
                        </SubMenu>
                      </Menu>
                    )}
                  </div>
                </div>
              </div> */}
              </Sider>
              <div
                className="mt-4 mr-3"
                onClick={() => props.onClose()}
                style={{
                  color: "black",
                  width: "1.5rem",
                  fontSize: "13px",
                  fontWeight: "900",
                  cursor: "pointer",
                }}
              >
                <span class="material-icons-outlined">arrow_forward_ios</span>
              </div>
            </section>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default EmployeeSidebar;
