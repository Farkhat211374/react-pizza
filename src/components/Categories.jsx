import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, getFilterSelector } from "../redux/slices/filterSlice";

function Categories() {
  const categoryIndex = useSelector(getFilterSelector).categoryId;

  const dispatch = useDispatch();

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const categories = [
    "Все",
    "Новое",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onChangeCategory(i)}
            className={Number(categoryIndex) === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
