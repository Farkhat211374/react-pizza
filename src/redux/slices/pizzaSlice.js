import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    item: {}, items: [], status: "loading",
};

export const fetchAllPizzas = createAsyncThunk("pizza/fetchAllPizzasStatus", async (params) => {
    const {category, searchBy, sort, currentPage} = params;
    const {data} = await axios.get(`https://66b345027fba54a5b7ec3747.mockapi.io/items?${category}&sortBy=${sort.sortType}&order=${sort.orderType}&page=${currentPage}&limit=4${searchBy}`);

    return data;
});

export const fetchPizza = createAsyncThunk("pizza/fetchPizzaStatus", async (params) => {
    const {id} = params;
    const {data} = await axios.get(`https://66b345027fba54a5b7ec3747.mockapi.io/items/${id}`);

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
            .addCase(fetchAllPizzas.fulfilled, (state, action) => {
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
                state.item = {};
            })
            .addCase(fetchPizza.fulfilled, (state, action) => {
                state.item = action.payload;
                state.status = "succeeded";
            })
            .addCase(fetchPizza.rejected, (state) => {
                state.item = {};
                state.status = "failed";
            });
    },
});

export const getPizzaSelector = (state) => state.pizza;
export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;
