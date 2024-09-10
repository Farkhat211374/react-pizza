import React from "react";
import { useDispatch } from "react-redux";
import { setCategoryId } from "../redux/filter/slice";

type CategoriesProps = {
  value: number;
}

export const Categories: React.FC<CategoriesProps> = React.memo(({value}) => {
  const dispatch = useDispatch();
  const onChangeCategory = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

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
                  className={Number(value) === i ? "active" : ""}
              >
                {categoryName}
              </li>
          ))}
        </ul>
      </div>
  );
});