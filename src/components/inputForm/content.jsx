import React from "react";
import handleDispatch from "../../utils/handleDispatch";
import styles from "../../styles/product/Form.module.css";

const InputContent = (props) => {
  const { fieldName, data, width, type } = props;
  const handleForm = handleDispatch.product.form;

  return fieldName === "description" ? (
    <textarea
      rows={1}
      className={styles.input_product}
      value={data}
      onChange={(e) => handleForm.onChange(fieldName, data, e.target.value)}
    />
  ) : (
    <input
      style={width ? { width: width } : {}}
      className={styles.input_product}
      type={type === "object" ? "number" : "text"}
      value={data}
      onChange={(e) => handleForm.onChange(fieldName, data, e.target.value)}
    />
  );
};

export default InputContent;
