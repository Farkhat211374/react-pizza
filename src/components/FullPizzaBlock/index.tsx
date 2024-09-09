import React from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {fetchPizza, getPizzaSelector} from "../../redux/slices/pizzaSlice";
import styles from "./FullPizzaBlock.module.scss";
import {addItem, selectCartItemById} from "../../redux/slices/cartSlice";
import {Skeleton} from "./Skeleton";
import {useAppDispatch} from "../../redux/store";

const FullPizzaBlock: React.FC = () => {
    const [activeType, setActiveType] = React.useState<number>(0);
    const [activeSize, setActiveSize] = React.useState<number>(0);
    const typesName = ["тонкое", "традиционное"];
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const {item, status} = useSelector(getPizzaSelector);
    const cartItem = useSelector(selectCartItemById(Number(id)));

    const addedCount = cartItem ? cartItem.count : 0;
    const onClickAdd = () => {
        dispatch(addItem(item));
    };

    React.useEffect(() => {
        dispatch(fetchPizza({id: id}));
    }, [dispatch, id]);

    if (status === "loading" || !item) {
        return (<div>
            <Skeleton/>
        </div>);
    }

    return (<div className={styles.container}>
        <div className={styles.pizza_photo}>
            <img src={item.imageUrl} alt={item.name}/>
        </div>
        <div className={styles.pizza_info}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <div className="pizza-block__selector">
                <ul>
                    {item.types.map((type: number) => (<li
                        key={type}
                        className={activeType === type ? "active" : ""}
                        onClick={() => setActiveType(type)}
                    >
                        {typesName[type]}
                    </li>))}
                </ul>
                <ul>
                    {item.sizes.map((size: number, i: number) => (<li
                        key={size}
                        className={activeSize === i ? "active" : ""}
                        onClick={() => setActiveSize(i)}
                    >
                        {size} см
                    </li>))}
                </ul>
            </div>
            <h4>{item.price} ₸</h4>
            <button
                onClick={onClickAdd}
                className="button button--outline button--add"
            >
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                        fill="white"
                    />
                </svg>
                <span>Добавить</span>
                {addedCount > 0 && <i>{addedCount}</i>}
            </button>
        </div>
    </div>)
};

export default FullPizzaBlock;
