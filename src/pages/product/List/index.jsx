import React from "react";
import ProductItem from "./Item/index";
import { useSelector } from "react-redux";
import styles from "../../../styles/product/Item.module.css";
import ProductListHeader from "./Header";
import Pagination from "../../../components/Pagination";

const ProductList = () => {
  const { list, pages } = useSelector((state) => state.products);
  const { page } = useSelector((state) => state.products.filter);
  const displayList = list.slice(0, 12);

  return (
    <div className={styles.container}>
      <ProductListHeader />
      <div className={styles.pages}> {list.length > 0 && `Page ${page} / ${pages}`}</div>
      <div className={styles.list}>
        {displayList.map((item, index) => (
          <ProductItem infoItem={item} key={`${item._id} ${index}`} />
        ))}
      </div>
      <Pagination type={"product"} />
    </div>
  );
};

export default ProductList;
