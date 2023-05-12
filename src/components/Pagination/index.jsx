import React from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/Pagination.module.css";
import handleDispatch from "../../utils/handleDispatch";

const Pagination = ({ type }) => {
  const { pages, filter } = useSelector((state) =>
    type === "product" ? state.productsReducer : state.ordersReducer
  );
  const handleFilter = (e) => handleDispatch[type].list.filter(e);
  const isFirst = filter.page === 1,
    isLast = filter.page === pages;

  console.log("Pagination rendered");

  let numberList = [];
  for (let i = 1; i < pages; i += 1) {
    numberList.push(
      <li
        key={i}
        className={filter.page === i ? styles.disable : ""}
        onClick={() => handleFilter({ page: i })}
      >
        {i}
      </li>
    );
  }

  return (
    <ul className={styles.pagination}>
      {pages === 1 ? (
        <li className={styles.disable}>1</li>
      ) : (
        <>
          <li
            className={isFirst ? styles.disable : ""}
            onClick={() => handleFilter({ page: filter.page - 1 })}
          >
            Prev
          </li>
          {numberList}
          <li className={isLast ? styles.disable : ""} onClick={() => handleFilter({ page: pages })}>
            {pages}
          </li>
          <li
            className={isLast ? styles.disable : ""}
            onClick={() => handleFilter({ page: filter.page + 1 })}
          >
            Next
          </li>
        </>
      )}
    </ul>
  );
};

export default Pagination;
