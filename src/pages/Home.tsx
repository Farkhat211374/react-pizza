import React from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort, {sortTypes} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import {useSelector} from "react-redux";
import qs from "qs";
import {useNavigate} from "react-router-dom";
import {getFilterSelector, setFilters} from "../redux/slices/filterSlice";
import {fetchAllPizzas, getPizzaSelector} from "../redux/slices/pizzaSlice";
import {useAppDispatch} from "../redux/store";

const Home: React.FC = () => {
    const isSearch = React.useRef<boolean>(false);
    const isMounted = React.useRef<boolean>(false);
    const {categoryId, sort, currentPage, searchValue} = useSelector(getFilterSelector);
    const {items, status} = useSelector(getPizzaSelector);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const getPizzas = async () => {

        dispatch(fetchAllPizzas({
            categoryId, searchValue, sort, currentPage,
        }));
    };

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoryId: categoryId, sortProperty: sort.sortType, orderBy: sort.orderType, currentPage: currentPage,
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort, currentPage]);

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortTypes.find((obj) => obj.sortType === params.sortProperty && obj.orderType === params.orderBy);
            if(sort) {
                params.sort = sort
            }
            dispatch(setFilters(params));
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

    return (<div className="container">
        <div className="content__top">
            <Categories/>
            <Sort/>
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === "failed" ? (<div className="content__error-info">
            <h2>
                Произошла ошибка <span>😕</span>
            </h2>
            <p>
                К сожалению, не удалось получить данные с сервера. Попробуйте
                повторить попытку позже.
            </p>
        </div>) : (<div className="content__items">
            {status === "loading" ? [...new Array(12)].map((_, index) => <Skeleton
                key={index}/>) : items.map((obj: any) => (<PizzaBlock key={obj.id} {...obj} />))}
        </div>)}
        <Pagination/>
    </div>);
};

export default Home;
