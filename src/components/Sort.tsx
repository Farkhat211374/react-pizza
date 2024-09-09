import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSortBy, getFilterSelector } from "../redux/slices/filterSlice";

type SortTypesItem = {
  name: string;
  sortType: "rating" | "price" | "title";
  orderType: "asc" | "desc";
}

type PopupClick = MouseEvent & {
  path: Node[];
};

export const sortTypes: SortTypesItem[] = [
  {
    name: "популярности по возрастанию",
    sortType: "rating",
    orderType: "asc",
  },
  {
    name: "популярности по уменьшению",
    sortType: "rating",
    orderType: "desc",
  },
  { name: "цене (сначала дешевые)", sortType: "price", orderType: "asc" },
  { name: "цене (сначала дорогие)", sortType: "price", orderType: "desc" },
  { name: "алфавиту (asc)", sortType: "title", orderType: "asc" },
  { name: "алфавиту (desc)", sortType: "title", orderType: "desc" },
];

const Sort: React.FC = () => {
  const sortObject = useSelector(getFilterSelector).sort;
  const dispatch = useDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);

  const onChangeSort = (obj: SortTypesItem) => {
    dispatch(setSortBy(obj));
  };

  const [isVisible, setIsVisible] = React.useState(false);

  const setSortType = (obj: SortTypesItem) => {
    onChangeSort(obj);
    setIsVisible(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const _event = event as PopupClick;
      const path = _event.composedPath ? _event.composedPath() : _event.path;
      if (sortRef.current && !path.includes(sortRef.current)) {
        setIsVisible(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div onClick={() => setIsVisible(!isVisible)} className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span>{sortObject.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {sortTypes.map((obj, i) => (
              <li
                key={i}
                onClick={() => setSortType(obj)}
                className={sortObject.name === obj.name ? "active" : ""}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
