import React, { useEffect } from "react";
import styles from "../../../styles/product/Form.module.css";
import { useSelector } from "react-redux";
import InputList from "./inputList";
import IconButton from "../../../components/icon/default";
import handleDispatch from "../../../utils/handleDispatch";
import { motion } from "framer-motion";

const ProductForm = () => {
  const { info } = useSelector((state) => state.productsReducer.isDetail);

  console.log("Form rendered");

  useEffect(() => {
    const handleEsc = (event) => event.key === "Escape" && handleDispatch.product.form.close(event);
    window.addEventListener("keyup", handleEsc);
    return () => {
      window.removeEventListener("keyup", handleEsc);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.container}
    >
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleDispatch.product.form.onSubmit(info);
        }}
      >
        <h1 className={styles.title}>{info.name}</h1>
        <div className={styles.input}>
          <InputList />
        </div>
        <div className={styles.btn}>
          <button type="submit" className={styles.btn_add}>
            UPDATE
          </button>
          <button
            type="button"
            className={styles.btn_delete}
            onClick={() => handleDispatch.product.list.delete()}
          >
            DELETE
          </button>
        </div>
        <IconButton type="close" styles={styles} handleClick={(e) => handleDispatch.product.form.close(e)} />
      </form>
    </motion.div>
  );
};

export default ProductForm;
