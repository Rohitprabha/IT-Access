import { Input } from "antd";
import React from "react";

const ApplicationInput = (props) => {
  var defaultVal =
    props.type === "name"
      ? props.field.name
      : props.type === "connectorType"
      ? props.field.connectorType
      : props.type === "approverMail"
      ? props.field.approverMail
      : props.type === "teamMail"
      ? props.field.teamMail
      : props.type === "documentationURL"
      ? props.field.documentationURL
      : props.type === "applicationURL"
      ? props.field.applicationURL
      : null;
  const onChange = (e) => {
    if (props.type === "name") {
      props.field.name = e;
    } else if (props.type === "connectorType") {
      props.field.connectorType = e;
    } else if (props.type === "approverMail") {
      props.field.approverMail = e;
    } else if (props.type === "teamMail") {
      props.field.teamMail = e;
    } else if (props.type === "applicationURL") {
      props.field.applicationURL = e;
    } else if (props.type === "documentationURL") {
      props.field.documentationURL = e;
    } else {
      //console.log(e);
    }
    //console.log(props.field);
  };
  return (
    <Input
      defaultValue={defaultVal}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};

export default ApplicationInput;
