import React, { useEffect } from "react";
import ProductList from "./List";
import ProductForm from "./Form";
import ProductHeader from "./Header/HeaderProduct";
import { AnimatePresence } from "framer-motion";
import styles from "../../styles/product/Item.module.css";
import { useSelector } from "react-redux";
import handleDispatch from "../../utils/handleDispatch";

const ProductLayout = () => {
  // console.log(useSelector((state) => state));
  const { status } = useSelector((state) => state.products.isDetail);

  useEffect(() => {
    handleDispatch.product.list.filter({ sort: "nac", page: 1 });
  }, []);

  return (
    <AnimatePresence>
      <div className={styles.layout}>
        <ProductHeader />
        <ProductList />
        {status && <ProductForm />}
      </div>
    </AnimatePresence>
  );
};

export default ProductLayout;
