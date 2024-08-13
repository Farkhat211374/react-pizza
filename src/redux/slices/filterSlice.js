import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortBy(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = action.payload.categoryId;
      state.sort = action.payload.sort;
      state.currentPage = action.payload.currentPage;
    },
  },
});

export const { setCategoryId, setSortBy, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
