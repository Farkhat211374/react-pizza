import React from "react";
import ResponsivePagination from "react-responsive-pagination";
import styles from "./Pagination.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {setCurrentPage} from "../../redux/filter/slice";
import {selectFilter} from "../../redux/filter/selectors"

const Pagination: React.FC = () => {
  const currentPage = useSelector(selectFilter).currentPage;
  const dispatch = useDispatch();
  const onChangePage = (number: number) => {
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
