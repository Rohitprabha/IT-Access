import React from "react";
import { Select } from "antd";
const { Option } = Select;

export const ConnectorSelect = (props) => {
  var defaultVal = props.field.type === "type" ? props.field.type : null;
  const onChange = (e) => {
    if (props.type === "type") {
      props.field.type = e;
    } else {
      //console.log(e);
    }
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
    </Select>
  );
};

export const ConnectorEnvSelect = (props) => {
  var defaultVal = props.field.type === "env" ? props.field.env : null;
  const onChange = (e) => {
    if (props.type === "env") {
      props.field.env = e;
    } else {
      //console.log(e);
    }
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
