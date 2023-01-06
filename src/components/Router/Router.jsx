import React, { Component } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ApplicationDetails from "../Access/ByApplication/ApplicationDetails";
import ByApplication from "../Access/ByApplication/ByApplication";
import ByEmployee from "../Access/ByEmployee/ByEmployee";
import EmployeeDetails from "../Access/ByEmployee/EmployeeDetails";
import EmployeeApplications from "../Access/NewEmployee/EmployeeApplications";
import NewEmployee from "../Access/NewEmployee/NewEmployee";
import ShareApplications from "../Access/NewEmployee/ShareApplications";
import Profile from "../common/Profile/Profile";
import Home from "../Home/Home";
import LoginPage from "../Login/loginPage";
import Application from "../Setup/Application";
import Connectors from "../Setup/Connectors/Connectors";
import Employee from "../Setup/Employee";
import Template from "../Setup/Template/Template";
import TemplateDetails from "../Setup/Template/TemplateDetails";
// import PrivateRoute from "./privateRoute";
// import PublicRoute from "./publicRoute";

class Routing extends Component {
  render() {
    return (
      <Router>
        <div className="h-100">
          <Routes>
            <Route exact path="/" element={<LoginPage key={1} />} />
            <Route exact path="/itaccess" element={<Home key={2} />}>
              <Route
                exact
                path="/itaccess/profile"
                element={<Profile key={11} />}
              />
              <Route
                exact
                path="/itaccess/access/new-employee"
                element={<NewEmployee key={3} />}
              >
                <Route
                  exact
                  path=":templateId"
                  element={<ShareApplications key={4} />}
                />
              </Route>
              <Route
                exact
                path="/itaccess/access/employee/:empId"
                element={<EmployeeApplications key={13} />}
              />
              <Route
                exact
                path="/itaccess/access/by-employee"
                element={<ByEmployee key={5} />}
              >
                <Route
                  exact
                  path=":empId"
                  element={<EmployeeDetails key={12} />}
                />
              </Route>
              <Route
                exact
                path="/itaccess/access/by-application"
                element={<ByApplication key={6} />}
              >
                <Route
                  exact
                  path=":applicationId"
                  element={<ApplicationDetails key={14} />}
                />
              </Route>
              <Route
                exact
                path="/itaccess/setup/employee"
                element={<Employee key={7} />}
              />
              <Route
                exact
                path="/itaccess/setup/application"
                element={<Application key={8} />}
              />
              <Route
                exact
                path="/itaccess/setup/template"
                element={<Template key={9} />}
              >
                <Route
                  exact
                  path=":tempId"
                  element={<TemplateDetails key={10} />}
                />
              </Route>
              <Route
                exact
                path="/itaccess/setup/connectors"
                element={<Connectors key={15} />}
              />
            </Route>
          </Routes>
        </div>
      </Router>
    );
  }
}

export default Routing;
