import React, { useEffect, useState } from "react";
import { Button, DatePicker, Input, Modal, Select } from "antd";
import moment from "moment";
import { resolveUserData } from "../../services/configs";
import "./profile.scss";
import { UpdateEmployee } from "../../services/setup.service";
import {
  ChangePasswordAlertNotification,
  ChangePasswordFailedNotification,
  ChangePasswordNotification,
} from "../Notifications/passwordNotifications";

const { Option } = Select;
const dateFormatList = ["MM/DD/YYYY", "MM/DD/YY"];

const Profile = (props) => {
  const data = resolveUserData();
  const [profileImag, setProfileImg] = useState("");
  const [userInfoLoader, setUserInfo] = useState(false);
  const [validPass, setValidPass] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);
  const [password, setPassword] = useState(data.password);
  let values = {
    empType: data.employmenttype,
    enddate: data.enddate,
    fullName: data.fullname,
    lastlogindate: data.lastlogindate,
    email: data.mail,
    managerid: data.managerid,
    managerMail: data.managermail,
    empRole: data.role,
    startDate: data.startdate,
    status: data.status,
    username: data.username,
    _id: data._id,
  };
  useEffect(() => {
    ProfileImage();
  }, []);
  const ProfileImage = () => {
    setUserInfo(true);
    let profileName = data.fullname;
    profileName = profileName[0].charAt(0) + profileName[1].charAt(0);
    setProfileImg(profileName);
    setTimeout(() => {
      setUserInfo(false);
    }, 2000);
  };

  const CustomAvatar = (props) => {
    return (
      <div className="profile justify-content-center mb-4">
        <div className={"customAvatar hoverStyle profileName"}>
          <span className={"position-relative spanStyle"}>
            {props.name.toUpperCase()}
          </span>
        </div>
        <span className="white userName">
          {data.fullname !== "" ? (
            <h4 className="text-capitalize"> {data.fullname} </h4>
          ) : (
            "User, Name LastName "
          )}
        </span>
      </div>
    );
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      //console.log(password);
    }
  };

  const handlePass = (e) => {
    let val = e.target.value;
    if (val.length <= 0) {
      setValidPass(false);
      setPassword(val);
    } else {
      setValidPass(true);
      setPassword(e.target.value);
    }
  };

  const ConfirmHandler = async () => {
    if (password == data.password) {
      ChangePasswordFailedNotification();
    } else if (validPass != true) {
      ChangePasswordAlertNotification();
    } else {
      let userDetails = {
        _id: data._id,
        username: data.username,
        password: password,
        fullname: data.fullname,
        mail: data.mail,
        employmenttype: data.employmenttype,
        role: data.role,
        managermail: data.managermail,
        managerid: data.managerid,
        startdate: data.startdate,
        enddate: data.enddate,
        status: data.status,
        lastlogindate: data.lastlogindate,
      };
      let userData = JSON.stringify(userDetails);
      localStorage.setItem("userData", userData);
      try {
        let response = await UpdateEmployee(userDetails, data._id);
        response = await response.json();
        //console.log(response);
        ChangePasswordNotification();
      } catch (error) {
        //console.log(error);
      }
    }
  };

  return (
    <section className="profileDetails">
      <div className="mx-3 my-4 pb-5">
        {userInfoLoader ? (
          <div className="text-center my-4 py-4">
            <i className="fas fa-spinner fa-2x fa-spin spinner spinnerTop"></i>
            <div className="loaderText mt-2">Fetching Profile</div>
          </div>
        ) : (
          <div className="card">
              <div className="my-4 px-4">
                {data.role && data.role == "Team Member" ? <a href="/itaccess" >Home</a> : null}
              <div className="card formCard" style={{ border: "none" }}>
                <div
                  className="row d-block mt-4"
                  style={{ marginLeft: "10%", marginRight: "10%" }}
                >
                  <CustomAvatar name={profileImag} />
                  <form>
                    <div className="d-flex mb-4">
                      <div className="form-group col-md-4">
                        <label
                          htmlFor="name"
                          className="font-weight-bold fontsize"
                        >
                          Full Name
                          {/* <span className="ml-1" style={{ color: "red" }}>
                  *
                </span> */}
                        </label>
                        <Input
                          size="large"
                          className="form-control profFont"
                          id="name"
                          placeholder="Enter fullname"
                          value={values.fullName}
                          disabled={true}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label
                          htmlFor="email"
                          className="font-weight-bold fontsize"
                        >
                          Email
                          {/* <span className="ml-1" style={{ color: "red" }}>
                  *
                </span> */}
                        </label>
                        <Input
                          size="large"
                          className="form-control profFont"
                          id="email"
                          placeholder="Enter email"
                          value={values.email}
                          disabled={true}
                        />
                      </div>
                      <div className="form-group col-md-4 d-flex flex-column">
                        <label
                          htmlFor="empType"
                          className="font-weight-bold fontsize"
                        >
                          Employment Type
                          {/* <span className="ml-1" style={{ color: "red" }}>
                  *
                </span> */}
                        </label>
                        <Select
                          defaultValue={values.empType}
                          disabled={true}
                          className="profFont"
                        >
                          <Option value="Full Time">Full Time</Option>
                          <Option value="Contractor">Contractor</Option>
                          <Option value="Vendor">Vendor</Option>
                        </Select>
                      </div>
                    </div>
                    <div className="d-flex mb-4">
                      <div className="form-group col-md-4 d-flex flex-column">
                        <label
                          htmlFor="empRole"
                          className="font-weight-bold fontsize"
                        >
                          Employment Role
                          {/* <span className="ml-1" style={{ color: "red" }}>
                  *
                </span> */}
                        </label>
                        <Select
                          defaultValue={values.empRole}
                          disabled={true}
                          className="profFont"
                        >
                          <Option value="Team Member">Team Member</Option>
                          <Option value="Administrator">Administrator</Option>
                          <Option value="Manager">Manager</Option>
                        </Select>
                      </div>
                      <div className="form-group col-md-4">
                        <label
                          htmlFor="managerMail"
                          className="font-weight-bold fontsize"
                        >
                          Manager Mail
                          {/* <span className="ml-1" style={{ color: "red" }}>
                  *
                </span> */}
                        </label>
                        <Input
                          size="large"
                          className="form-control profFont"
                          id="managerMail"
                          placeholder="Enter Manager Mail"
                          value={values.managerMail}
                          disabled={true}
                        />
                      </div>
                      <div className="form-group col-md-4 d-flex flex-column">
                        <label
                          htmlFor="startDate"
                          className="font-weight-bold fontsize"
                        >
                          Start Date
                          {/* <span className="ml-1" style={{ color: "red" }}>
                  *
                </span> */}
                        </label>
                        <DatePicker
                          defaultValue={moment(
                            values.startDate,
                            dateFormatList[0]
                          )}
                          disabled={true}
                          className="profFont"
                        />
                      </div>
                    </div>
                    <div className="d-flex mb-4">
                      <div className="form-group col-md-4 d-flex flex-column">
                        <label
                          htmlFor="status"
                          className="font-weight-bold fontsize"
                        >
                          Status
                          {/* <span className="ml-1" style={{ color: "red" }}>
                  *
                </span> */}
                        </label>
                        <Select
                          defaultValue={values.status}
                          disabled={true}
                          className="profFont"
                        >
                          <Option value="Active">Active</Option>
                          <Option value="Inactive">Inactive</Option>
                        </Select>
                      </div>
                      <div className="form-group col-md-4 d-flex flex-column">
                        <label
                          htmlFor="status"
                          className="font-weight-bold fontsize"
                        >
                          Password
                        </label>
                        <div
                          className={
                            validPass
                              ? "d-flex mcp-light-gray pass"
                              : "invalid d-flex mcp-light-gray pass"
                          }
                        >
                          <Input
                            type={passwordShown ? "text" : "password"}
                            className="form-control form-rm passInput"
                            id="floatingPassword2"
                            placeholder="Password"
                            value={password}
                            onChange={handlePass}
                            onKeyDown={keyDownHandler}
                          />
                          {passwordShown ? (
                            <i
                              className="fas fa-eye-slash password icon-sty mr-2"
                              onClick={togglePassword}
                            ></i>
                          ) : (
                            <i
                              className="fas fa-eye icon-sty password mr-2"
                              onClick={togglePassword}
                            ></i>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="d-flex mb-4 justify-content-center">
                      <Button
                        type="primary"
                        className="buttonStyles"
                        style={{ width: "7rem" }}
                        onClick={ConfirmHandler}
                      >
                        Save
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
