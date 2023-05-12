import React from "react";
import styles from "../../../styles/product/Form.module.css";
import inputList from "../../../utils/productFormConfig";
import InputHeader from "../../../components/inputForm/header";
import InputComponent from "../../../components/inputForm/index";

const InputList = () => {
  return inputList.map((item, index) => {
    return (
      <div className={styles[item.field]} key={index}>
        <InputHeader item={item} />
        <InputComponent item={item} />
      </div>
    );
  });
};

export default InputList;
