import React from "react";
import styles from "../../styles/loading/loading.module.css";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const LazyLoading = () => {
  const isLoading = useSelector((state) => state.loadingReducer.status);
  return (
    isLoading && (
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.loading}
        ></motion.div>
      </div>
    )
  );
};

export default LazyLoading;
