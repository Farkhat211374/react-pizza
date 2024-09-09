import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export type SortItem = {
  name: string;
  sortType: "rating" | "price" | "title";
  orderType: "asc" | "desc";
}

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: SortItem;
}

const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности по возрастанию",
    sortType: "rating",
    orderType: "asc",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortBy(state, action: PayloadAction<SortItem>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.categoryId = action.payload.categoryId;
      state.sort = action.payload.sort;
      state.currentPage = action.payload.currentPage;
    },
  },
});

export const getFilterSelector = (state: RootState) => state.filter;

export const {
  setCategoryId,
  setSortBy,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
