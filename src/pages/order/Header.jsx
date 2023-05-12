import React from "react";
import styles from "../../styles/order/header.module.css";

const HeaderOrder = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.sub_header}>Order Details</h1>
      <p className={styles.details}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id vestibulum nibh, et egestas
        tellus. Sed eget congue nisl, sit amet suscipit ex. Cras placerat viverra feugiat. Mauris at justo nec
        turpis eleifend ultricies vel ac ipsum. Duis eget urna eros. Praesent interdum dignissim consequat.
        Sed eu est augue. Sed vulputate justo non libero tempor, eu porttitor risus dignissim. Nunc at quam
        sit amet sapien scelerisque tincidunt. In a leo ac arcu commodo scelerisque.
      </p>
    </div>
  );
};

export default HeaderOrder;
