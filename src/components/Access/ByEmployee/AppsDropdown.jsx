import React, { useEffect, useMemo, useState, useRef } from "react";
import { Select, Spin } from "antd";
import debounce from "lodash/debounce";
import { NoApplicationNotifications } from "../../common/Notifications/AlertNotifications";
const { Option } = Select;
const AppsDropdown = (props) => {
  let getApps = props.getApps;
  let value = props.value;

  function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
      const loadOptions = (value) => {
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        setOptions([]);
        // setFetching(true);
        fetchOptions(value).then((newOptions) => {
          if (fetchId !== fetchRef.current) {
            // for fetch callback order
            return;
          }
            if (newOptions != undefined) {
            let userNotExists = newOptions.some((user) => user.label == null);
            if (userNotExists) {
              NoApplicationNotifications();
              setFetching(false);
            } else {
              setFetching(false);
              setOptions(newOptions);
            }
          }
        });
      };

      // return debounce(loadOptions, debounceTimeout);
      return loadOptions;
    }, [fetchOptions]);
    return (
      <div className="d-flex">
        <Select
          labelInValue
          filterOption={false}
          onSearch={debounceFetcher}
          notFoundContent={null}
          {...props}
          options={options}
          className="selectSty"
        />
        {fetching && (
          <i className="fas fa-spinner fa-2x fa-spin spinner saveSpinner mr-2"></i>
        )}
      </div>
    );
  }

  return (
    <div
      className="debounceSelectStyle"
      style={{ width: "30%", placeSelf: "center" }}
    >
      <DebounceSelect
        mode="multiple"
        value={value}
        placeholder="new application name"
        fetchOptions={getApps}
        onChange={(newValue) => {
          props.setValues(newValue);
        }}
        style={{
          width: "100%",
        }}
      />
    </div>
  );
};

export default AppsDropdown;
