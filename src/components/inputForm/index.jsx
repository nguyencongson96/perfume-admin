import React from "react";
import InputContent from "./content";
import IconButton from "../icon/default";
import { useSelector } from "react-redux";
import styles from "../../styles/product/Form.module.css";
import handleDispatch from "../../utils/handleDispatch";

const InputComponent = (props) => {
  const { field, detail, typeInput } = props.item;
  const { info } = useSelector((state) => state.productsReducer.isDetail);

  switch (typeInput) {
    case "text":
      return <InputContent fieldName={field} data={info[field]} index={0} width={"100%"} type={typeInput} />;

    case "array":
      return info[field].map((value, index) => (
        <div className={styles.input_content} key={index}>
          <InputContent key={index} fieldName={field} data={value} index={index} type={typeInput} />
          <IconButton
            type="delete"
            styles={styles}
            handleClick={() => handleDispatch.product.form.delete(field, index)}
          />
        </div>
      ));

    case "object":
      const firstFieldinObj = detail[0].name;
      return info[firstFieldinObj].map((val, valIndex) => (
        <div key={valIndex} className={styles.input_content}>
          <div className={styles.input_obj}>
            {detail.map(({ name, unit }, detailIndex) => (
              <div key={detailIndex}>
                {name} ({unit}):
                <InputContent
                  fieldName={name}
                  data={info[name][valIndex]}
                  index={valIndex}
                  type={typeInput}
                />
              </div>
            ))}
          </div>
          <IconButton
            type="delete"
            styles={styles}
            handleClick={() => handleDispatch.product.form.delete(field, valIndex)}
          />
        </div>
      ));

    default:
      return <></>;
  }
};

export default InputComponent;
