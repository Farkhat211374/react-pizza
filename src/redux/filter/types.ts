export enum SortPropertyEnum {
    RATING = 'rating',
    TITLE = 'title',
    PRICE = 'price',
}

export enum OrderPropertyEnum {
    ASCENDING  = 'asc',
    DESCENDING  = 'desc',
}

export type SortItem = {
    name: string;
    sortType: SortPropertyEnum;
    orderType: OrderPropertyEnum;
};

export interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: SortItem;
}