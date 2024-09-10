import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';

export const fetchAllPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const { sort, categoryId, searchValue, currentPage } = params;
        const category = `${categoryId > 0 ? `category=${categoryId}` : ""}`;
        const searchBy = `${searchValue ? `&search=${searchValue}` : ""}`;

        const {data} = await axios.get<Pizza[]>(`https://66b345027fba54a5b7ec3747.mockapi.io/items?${category}&sortBy=${sort.sortType}&order=${sort.orderType}&page=${currentPage}&limit=4${searchBy}`);

        return data;
    },
);

export const fetchPizza = createAsyncThunk<Pizza, Record<string, number>>("pizza/fetchPizzaStatus", async (params) => {
    const {id} = params;
    const {data} = await axios.get<Pizza>(`https://66b345027fba54a5b7ec3747.mockapi.io/items/${id}`);

    return data;
});