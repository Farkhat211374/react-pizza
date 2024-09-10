import React from "react";
import {Sort, sortTypes} from "../components/";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import {useSelector} from "react-redux";
import {Pagination, Categories, PizzaBlock} from "../components"
import qs from "qs";
import {useNavigate} from "react-router-dom";
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import {fetchAllPizzas} from '../redux/pizza/asyncActions';
import { SearchPizzaParams } from '../redux/pizza/types';
import {useAppDispatch} from "../redux/store";
import {FilterSliceState, SortItem} from "../redux/filter/types";

const Home: React.FC = () => {
    const isSearch = React.useRef<boolean>(false);
    const isMounted = React.useRef<boolean>(false);
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);
    const {items, status} = useSelector(selectPizzaData);

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
                categoryId: categoryId, sortProperty: sort.sortType, orderBy: sort.orderType, currentPage: currentPage, search: searchValue
            });
            navigate(`?${queryString}`);
        }
        isMounted.current = true;
    }, [categoryId, sort, currentPage]);

    React.useEffect(() => {
        if (window.location.search) {
            const query = qs.parse(window.location.search.substring(1));
            const sort: SortItem = sortTypes.find((obj) => obj.sortType === query.sortProperty && obj.orderType === query.orderBy) || sortTypes[0];

            const params: FilterSliceState = {
                searchValue: String(query.search),
                categoryId: Number(query.categoryId),
                currentPage: Number(query.currentPage),
                sort: {
                    name: sort.name,
                    sortType: sort.sortType,
                    orderType: sort.orderType,
                }
            }

            dispatch(setFilters(params));
            isSearch.current = true;
        }
    }, []);

    React.useEffect(() => {
        window.scrollTo(0, 0);
        if (!isSearch.current) {
            getPizzas()
        }

        isSearch.current = false;
    }, [categoryId, sort, currentPage, searchValue]);

    return (<div className="container">
        <div className="content__top">
            <Categories value={categoryId} />
            <Sort value={sort} />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        {status === "error" ? (<div className="content__error-info">
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
