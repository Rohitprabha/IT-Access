import React, { useEffect } from "react";
import { Layout, Menu, Input } from "antd";
import "./Sidebar.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { resolveUserData } from "../../services/configs";

const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = () => {
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
    {userData.role && userData.role != "Team Member" ? (
    <>
      <section
      className="sidebar h-100"
      onMouseEnter={mouseInEventHandler}
      onMouseLeave={mouseOutEventHandler}
      >
        <Sider
        trigger={null}
        theme="light"
        collapsible
        collapsed={collapsed}
        width={240}
        className="site-layout-background h-100"
      >
        <div
          className={
            collapsed ? "logoCollapsed text-center" : "logoStyle text-center"
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
                    collapsed ? "subTitle mt-4 d-flex" : "subTitle mt-3 d-flex"
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
                          className={collapsed ? "d-none" : "submenu-ItemStyle"}
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
                    collapsed ? "subTitle mt-4 d-flex" : "subTitle mt-1 d-flex"
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
                          userData.role === "Administrator" ) ? (
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
        </div>
    </Sider>
    </section>
    </>
    ) : null}</>
  );
};

export default Sidebar;
