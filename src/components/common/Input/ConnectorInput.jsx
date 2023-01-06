import { Input } from "antd";
import React from "react";

const ConnectorInput = (props) => {
  var defaultVal =
    props.type === "name"
      ? props.field.name
      : props.type === "userName"
      ? props.field.userName
      : props.type === "password"
      ? props.field.password
      : props.type === "url"
      ? props.field.url
      : null;
  const onChange = (e) => {
    if (props.type === "name") {
      props.field.name = e;
    } else if (props.type === "userName") {
      props.field.userName = e;
    } else if (props.type === "password") {
      props.field.password = e;
    } else if (props.type === "url") {
      props.field.url = e;
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

export default ConnectorInput;
