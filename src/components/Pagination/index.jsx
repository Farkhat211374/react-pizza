import React from "react";
import ResponsivePagination from "react-responsive-pagination";
import styles from "./Pagination.module.scss";
import { AppContext } from "../../App.js";

const Pagination = () => {
  const { pageIndex, setPageIndex } = React.useContext(AppContext);

  return (
    <ResponsivePagination
      className={styles.root}
      current={pageIndex}
      total={3}
      onPageChange={setPageIndex}
    />
  );
};

export default Pagination;
