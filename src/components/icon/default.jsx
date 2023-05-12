import React from "react";
import iconConfig from "../../utils/iconConfig";

const IconButton = (props) => {
  const { type, styles, order, handleClick } = props;

  return (
    <svg
      id={order}
      tabIndex={0}
      className={styles[type]}
      onClick={handleClick}
      onKeyUp={(event) => event.key === "Enter" && handleClick()}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path d={iconConfig[type].path} />
    </svg>
  );
};

export default IconButton;
