import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllPizzas, fetchPizza } from './asyncActions';
import { Pizza, PizzaSliceState, Status } from './types';

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
    status: Status.LOADING, // loading | success | error
};

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllPizzas.pending, (state, action) => {
            state.status = Status.LOADING;
            state.items = [];
        });

        builder.addCase(fetchAllPizzas.fulfilled, (state, action) => {
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });

        builder.addCase(fetchAllPizzas.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.items = [];
        });
        builder.addCase(fetchPizza.pending, (state, action) => {
            state.status = Status.LOADING;
            state.item = {
                id: 0,
                name: '',
                description: '',
                price: 0,
                imageUrl: '',
                sizes: [],
                types: [],
            }
        });

        builder.addCase(fetchPizza.fulfilled, (state, action) => {
            state.item = action.payload;
            state.status = Status.SUCCESS;
        });

        builder.addCase(fetchPizza.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.item = {
                id: 0,
                name: '',
                description: '',
                price: 0,
                imageUrl: '',
                sizes: [],
                types: [],
            };
        });
    },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;