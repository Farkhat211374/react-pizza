import React from "react";
import ResponsivePagination from "react-responsive-pagination";
import styles from "./Pagination.module.scss";
import {
  setCurrentPage,
  getFilterSelector,
} from "../../redux/slices/filterSlice.js";
import { useSelector, useDispatch } from "react-redux";

const Pagination = () => {
  const currentPage = useSelector(getFilterSelector).currentPage;
  const dispatch = useDispatch();
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <ResponsivePagination
      className={styles.root}
      current={Number(currentPage)}
      total={3}
      onPageChange={onChangePage}
    />
  );
};

export default Pagination;
