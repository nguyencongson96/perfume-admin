import React from "react";
import styles from "../../../../styles/product/Item.module.css";
import handleDispatch from "../../../../utils/handleDispatch";

const ProductItem = (props) => {
  const { infoItem } = props;

  const handleClick = () => {
    handleDispatch.product.list.getDetail(infoItem);
  };

  return (
    <div
      tabIndex="0"
      className={styles.product_item}
      onClick={() => handleClick()}
      onKeyUp={(event) => event.key === "Enter" && handleClick()}
    >
      <div className={styles.image_container}>
        <img className={styles.image} src={infoItem.image[0]} alt="" />
      </div>
      <div className={styles.details}>
        <div className={styles.title}>{infoItem.name}</div>
        <span className={styles.price}>${infoItem.price[0]}</span>
      </div>
    </div>
  );
};

export default ProductItem;
