import React from "react";

const SelectInput = (props) => {
  const { list, defaultVal, handleChange } = props;
  const keyList = Object.keys(list),
    valueList = Object.values(list);
  return (
    <select defaultValue={defaultVal} onChange={(e) => handleChange(e)}>
      {keyList.map((item, index) => (
        <option key={index} value={item}>
          {valueList[index]}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
