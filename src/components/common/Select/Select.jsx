import React from "react";
import { Select } from "antd";
const { Option } = Select;

const SelectFun = (props) => {
  var defaultVal =
    props.type === "employmenttype"
      ? props.field.employmenttype
      : props.type === "role"
      ? props.field.role
      : props.field.status;
  const onChange = (e) => {
    // defaultVal = e;
    if (props.type === "employmenttype") {
      props.field.employmenttype = e;
    } else if (props.type === "role") {
      props.field.role = e;
    } else {
      props.field.status = e;
      if (e == "Inactive") props.setUpdateEndDate(true);
      else props.setUpdateEndDate(false);
    }
    //console.log(props.field);
  };
  return (
    <Select
      defaultValue={defaultVal}
      onChange={(e) => {
        onChange(e);
      }}
    >
      <Option value={props.values[0]}>{props.values[0]}</Option>
      <Option value={props.values[1]}>{props.values[1]}</Option>
      <Option value={props.values[2]}>{props.values[2]}</Option>
    </Select>
  );
};

export default SelectFun;
