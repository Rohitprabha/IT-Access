import React, { useEffect, useState } from "react";
import UserProfile from "../UserProfile/userProfile";
import "./topbar.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { resolveUserData } from "../../services/configs";
import logo from "../../../Resources/itaccess_logo.svg";

const TopBar = () => {
  const path = window.location.pathname.split("/");
  var nlpApps = path[1];
  var pathId = path[2];
  const userData = resolveUserData();

  return (
    <section className="topBar">
      <div className="">
        <div className="row toggleClass justify-content-center">
          <img
            className=" mt-2"
            src={logo}
            alt="Logo"
            style={{ height: "3rem" }}
          />
          <div className="col text-center" style={{ marginLeft: "12%" }}>
            <div className="font-weight-bold sizeStyle">IT Access</div>
          </div>
          <UserProfile userData={userData} />
        </div>
      </div>
    </section>
  );
};

export default TopBar;
