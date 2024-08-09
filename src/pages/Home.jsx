import React from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/Sort";
import { Skeleton } from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { AppContext } from "../App";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryIndex, setCategoryIndex] = React.useState(0);
  const { pageIndex, searchValue } = React.useContext(AppContext);
  const [sortObject, setSortObject] = React.useState({
    name: "популярности по возрастанию",
    sortType: "rating",
    orderType: "asc",
  });

  React.useEffect(() => {
    setIsLoading(true);
    const category = `${categoryIndex > 0 ? `category=${categoryIndex}` : ""}`;
    const searchBy = `${searchValue ? `&search=${searchValue}` : ""}`;

    fetch(
      `https://66b345027fba54a5b7ec3747.mockapi.io/items?${category}&sortBy=${sortObject.sortType}&order=${sortObject.orderType}&page=${pageIndex}&limit=4${searchBy}`
    )
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryIndex, sortObject, pageIndex, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryIndex}
          onChangeCategory={(i) => setCategoryIndex(i)}
        />
        <Sort value={sortObject} onChangeSort={(obj) => setSortObject(obj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(12)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
