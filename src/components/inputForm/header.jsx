import React from "react";
import styles from "../../styles/product/Form.module.css";
import IconButton from "../icon/default";
import handleDispatch from "../../utils/handleDispatch";

const InputHeader = (props) => {
  const { field, typeInput } = props.item;

  return (
    <div className={styles.sub_header}>
      <div className={styles.sub_title}>
        {field.toUpperCase()}:
        <span className={styles.italic}>{typeInput !== "text" && " (Only add up to 3 values)"}</span>
      </div>
      {typeInput !== "text" && (
        <IconButton type="add" styles={styles} handleClick={() => handleDispatch.product.form.add(field)} />
      )}
    </div>
  );
};

export default InputHeader;
