import React from "react";
import SearchInput from "./Search";
import OrderList from "./List";
import HeaderOrder from "./Header";
import styles from "../../styles/order/item.module.css";
import Pagination from "../../components/Pagination";

const OrderLayout = () => {
  return (
    <div className={styles.layout}>
      <HeaderOrder />
      <SearchInput />
      <OrderList />
      <Pagination type={"order"} />
    </div>
  );
};

export default OrderLayout;
