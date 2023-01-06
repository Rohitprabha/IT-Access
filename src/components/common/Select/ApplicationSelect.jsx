import React, { useState } from "react";
import { Select } from "antd";
import { GetConnectorByName } from "../../services/connectors.service";
const { Option } = Select;

export const ApplicationSelect = (props) => {
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

export const ApplicationEnvSelect = (props) => {
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


export const ApplicationConnectorSelect = (props) => {
  const [items, setItems] = useState([]);
  var defaultVal = props.type === "connectorType"
      ? props.field.connectorType : null;

  const onChange = (value) => {
    props.field.connectorType = value;
};

const onSearch = async(value) => {
  //console.log('search:', value);
  try {
    if (value !== "") {
      try {
        let applicationResponse = await GetConnectorByName(value);
        applicationResponse = await applicationResponse.json();
        if (applicationResponse.Result && applicationResponse.Result.length > 0)
          setItems(applicationResponse.Result);
        else {

          setItems("");
        }
      } catch (error) {
        //console.log("Error", error);
      }
    }
  } catch (error) {
    
  }
};
  
  return (
    <Select
      showSearch
      placeholder="Select a Connector"
      optionFilterProp="children"
      value={defaultVal}
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().includes(input.toLowerCase())
      }
    >
      {items.length > 0 &&
        items.map((item) => {
          return <Option value={item.name}>{item.name}</Option>;
        })}
    </Select>
  );
};

