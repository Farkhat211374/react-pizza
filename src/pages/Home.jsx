import React from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort, { sortTypes } from "../components/Sort";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
import { Link, useNavigate } from "react-router-dom";
import { setFilters, getFilterSelector } from "../redux/slices/filterSlice";
import { fetchAllPizzas, getPizzaSelector } from "../redux/slices/pizzaSlice";

const Home = () => {
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(getFilterSelector);
  const { items, status } = useSelector(getPizzaSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPizzas = async () => {
    const category = `${categoryId > 0 ? `category=${categoryId}` : ""}`;
    const searchBy = `${searchValue ? `&search=${searchValue}` : ""}`;

    dispatch(
      fetchAllPizzas({
        category,
        searchBy,
        sort,
        currentPage,
      })
    );
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId: categoryId,
        sortProperty: sort.sortType,
        orderBy: sort.orderType,
        currentPage: currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortTypes.find(
        (obj) =>
          obj.sortType === params.sortProperty &&
          obj.orderType === params.orderBy
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, currentPage, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "failed" ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>
            К сожалению, не удалось получить данные с сервера. Попробуйте
            повторить попытку позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(12)].map((_, index) => <Skeleton key={index} />)
            : items.map((obj) => (
                <Link key={obj.id} to={`pizza/${obj.id}`}>
                  <PizzaBlock {...obj} />
                </Link>
              ))}
        </div>
      )}
      <Pagination />
    </div>
  );
};

export default Home;
