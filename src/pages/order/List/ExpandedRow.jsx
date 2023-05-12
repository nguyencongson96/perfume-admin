import React, { useEffect } from "react";
import handleDispatch from "../../../utils/handleDispatch";
import { useSelector } from "react-redux";
import styles from "../../../styles/order/details.module.css";

const ExpandedRow = (props) => {
  const { record } = props,
    id = record._id;
  const detail = useSelector((state) => state.ordersReducer.detail);

  console.log(detail);

  useEffect(() => {
    handleDispatch.order.list.detail(id);
  }, [id]);

  return (
    <div className={styles.expand}>
      <h1 className={styles.header}>Cart</h1>
      <div className={styles.list}>
        {Object.keys(detail).length > 0 &&
          detail.cart.detail.map((item, index) => (
            <div key={index} className={styles.item}>
              <img src={item.image} className={styles.image} alt={item._id} />
              <div className={styles.detail}>
                <div className={styles.name}>
                  Product Name: <span className="bold">{item.name}</span>
                </div>
                <div className={styles.quantity}>
                  Quantity: <span className="bold">{item.quantity}</span>
                </div>
                <div className={styles.capacity}>
                  Capacity : <span className="bold">{item.capacity} </span>
                  <span className="bold italic">ml</span>
                </div>
                <div className={styles.price}>
                  Price per item : <span className="bold">{item.price}</span>
                  <span className="bold italic">$</span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ExpandedRow;
