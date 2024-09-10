import {SortItem} from "../filter/types";

export type Pizza = {
    id: number;
    name: string;
    description : string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
};

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
}

export type SearchPizzaParams = {
    sort: SortItem;
    categoryId: number;
    searchValue: string;
    currentPage: number;
};

export interface PizzaSliceState {
    item: Pizza;
    items: Pizza[];
    status: Status;
}