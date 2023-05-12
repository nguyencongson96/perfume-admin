import React from "react";
import SelectInput from "../../../components/input/Select";
import IconButton from "../../components/icon/default";
import styles from "../../../styles/order/details.module.css";
import handleDispatch from "../../utils/handleDispatch";

const DetailOrder = (props) => {
  const { _id, name, phone, status, total } = props.content;
  return (
    <>
      <td className={styles.id}>{_id}</td>
      <td className={styles.name}>
        {name}
        <input id={styles.name_input} className={styles.name_input} type="text" value={name} />
      </td>
      <td className={styles.phone}>
        <input id={styles.phone_input} className={styles.phone_input} type="text" value={phone} />
      </td>
      <td className={styles.status}>
        <SelectInput
          list={{
            Pending: "Pending",
            Dispatched: "Dispatched",
            Delivered: "Delivered",
            Cancelled: "Cancelled",
          }}
          defaultVal={status}
        />
      </td>
      <td className={styles.total}>{total}</td>
      <td className={styles.edit_icon}>
        <IconButton
          type={"edit"}
          styles={styles}
          order={props.key}
          handleClick={() => handleDispatch.order.list.detail(_id)}
        />
      </td>
    </>
  );
};

export default DetailOrder;
