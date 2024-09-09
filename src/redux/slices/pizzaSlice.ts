import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";
import {FilterSliceState} from "./filterSlice";

type PizzaItem = {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
}

interface PizzaSliceState {
    item: PizzaItem;
    items: PizzaItem[];
    status: "loading" | "succeeded" | "failed"
}

const initialState: PizzaSliceState = {
    item: {
        id: 0,
        name: '',
        description: '',
        price: 0,
        imageUrl: '',
        sizes: [],
        types: [],
    },
    items: [],
    status: "loading",
};

export const fetchAllPizzas = createAsyncThunk<PizzaItem[], FilterSliceState>("pizza/fetchAllPizzasStatus", async (params) => {
    const {categoryId, searchValue, sort, currentPage} = params;
    const category = `${categoryId > 0 ? `category=${categoryId}` : ""}`;
    const searchBy = `${searchValue ? `&search=${searchValue}` : ""}`;

    const {data} = await axios.get<PizzaItem[]>(`https://66b345027fba54a5b7ec3747.mockapi.io/items?${category}&sortBy=${sort.sortType}&order=${sort.orderType}&page=${currentPage}&limit=4${searchBy}`);

    return data;
});

export const fetchPizza = createAsyncThunk<PizzaItem, Record<string, number>>("pizza/fetchPizzaStatus", async (params) => {
    const {id} = params;
    const {data} = await axios.get<PizzaItem>(`https://66b345027fba54a5b7ec3747.mockapi.io/items/${id}`);

    return data;
});

export const pizzaSlice = createSlice({
    name: "pizza", initialState, reducers: {
        setItems(state, action) {
            state.items = action.payload;
        }, setItem(state, action) {
            state.item = action.payload;
        },
    }, extraReducers: (builder) => {
        builder
            .addCase(fetchAllPizzas.pending, (state) => {
                state.status = "loading";
                state.items = [];
            })
            .addCase(fetchAllPizzas.fulfilled, (state, action: PayloadAction<PizzaItem[]>) => {
                state.items = action.payload;
                if (state.items.length <= 0) {
                    state.status = 'failed';
                } else {
                    state.status = "succeeded";
                }
            })
            .addCase(fetchAllPizzas.rejected, (state) => {
                state.items = [];
                state.status = "failed";
            })
            .addCase(fetchPizza.pending, (state) => {
                state.status = "loading";
                state.item = {
                    id: 0,
                    name: '',
                    description: '',
                    price: 0,
                    imageUrl: '',
                    sizes: [],
                    types: [],
                };
            })
            .addCase(fetchPizza.fulfilled, (state, action: PayloadAction<PizzaItem>) => {
                state.item = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchPizza.rejected, (state) => {
                state.item = {
                    id: 0,
                    name: '',
                    description: '',
                    price: 0,
                    imageUrl: '',
                    sizes: [],
                    types: [],
                };
                state.status = "failed";
            });
    },
});

export const getPizzaSelector = (state: RootState) => state.pizza;
export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;
