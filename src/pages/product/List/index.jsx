import React from "react";
import ProductItem from "./Item/index";
import { useSelector } from "react-redux";
import styles from "../../../styles/product/Item.module.css";
import ProductListHeader from "./Header";
import Pagination from "../../../components/Pagination";

const ProductList = () => {
  const { list, pages } = useSelector((state) => state.productsReducer);
  const { page } = useSelector((state) => state.productsReducer.filter);
  const isLoading = useSelector((state) => state.loadingReducer.status);

  return (
    <div className={styles.container}>
      <ProductListHeader />
      <div className={styles.pages}> {list.length > 0 && `Page ${page} / ${pages}`}</div>
      <div className={styles.list} style={isLoading ? { filter: "blur(2px)", opacity: 0.5 } : {}}>
        {list.map((item, index) => (
          <ProductItem infoItem={item} key={`${item._id} ${index}`} />
        ))}
      </div>
      <Pagination type={"product"} />
    </div>
  );
};

export default ProductList;
