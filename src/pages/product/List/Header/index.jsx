import React, { useState } from "react";
import styles from "../../../../styles/product/HeaderList.module.css";
import handleDispatch from "../../../../utils/handleDispatch";
import IconButton from "../../../../components/icon/default";
import { useSelector } from "react-redux";
import SelectInput from "../../../../components/select/Select";

const ProductListHeader = () => {
  const { sort } = useSelector((state) => state.productsReducer.filter);
  const [currentName, setCurrentName] = useState("");
  const filter = (e) => handleDispatch.product.list.filter(e);

  console.log("Product List Header rendered");

  return (
    <div className={styles.sub_header}>
      <SelectInput
        list={{ nac: "Name A-Z", ndc: "Name Z-A", pac: "Price Ascending", pdc: "Price Descending" }}
        defaultVal={sort || "nac"}
        handleChange={(e) => filter({ sort: e.target.value, name: currentName })}
      />
      <div className={styles.search}>
        <input
          type="text"
          className={styles.search_input}
          placeholder="Type something here"
          value={currentName}
          onChange={(e) => setCurrentName(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && filter({ name: currentName })}
        />
        <button type="button" className={styles.search_btn} onClick={() => filter({ name: currentName })}>
          Search
        </button>
      </div>
      <div className={styles.btn_add}>
        <span>Add New</span>
        <IconButton type="add" styles={styles} handleClick={() => handleDispatch.product.list.getDetail()} />
      </div>
    </div>
  );
};

export default ProductListHeader;
