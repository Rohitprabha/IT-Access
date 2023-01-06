import { Input } from "antd";
import React from "react";

const InputFun = (props) => {
  var defaultVal =
    props.type === "fullname"
      ? props.field.fullname
      : props.type === "username"
      ? props.field.username
      : props.type === "mail"
      ? props.field.mail
      : props.type === "managermail"
      ? props.field.managermail
      : null;
  const onChange = (e) => {
    if (props.type === "fullname") {
      props.field.fullname = e;
    } else if (props.type === "username") {
      props.field.username = e;
    } else if (props.type === "mail") {
      props.field.mail = e;
    } else if (props.type === "managermail") {
      props.field.managermail = e;
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

export default InputFun;
