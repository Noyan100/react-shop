import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFilterSlice } from '../types/types';

const initialState = {
  category: [],
  featured: [],
  minPrice: 0,
  maxPrice: 0,
  sort: 'most price',
  currentPage: 1,
} as TFilterSlice;

const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<string>) {
      state.category = [...state.category, action.payload];
      state.currentPage = 1;
    },
    removeCategory(state, action: PayloadAction<string>) {
      state.category = state.category.filter((value) => value !== action.payload);
      state.currentPage = 1;
    },
    addFeatured(state, action: PayloadAction<string>) {
      state.featured = [...state.featured, action.payload];
      state.currentPage = 1;
    },
    removeFeatured(state, action: PayloadAction<string>) {
      state.featured = state.featured.filter((value) => value !== action.payload);
      state.currentPage = 1;
    },
    setMinPrice(state, action: PayloadAction<number>) {
      state.minPrice = action.payload;
      state.currentPage = 1;
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      state.maxPrice = action.payload;
      state.currentPage = 1;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    resetFilter(state) {
      state.category = [];
      state.featured = [];
      state.minPrice = 0;
      state.maxPrice = 0;
      state.sort = 'most recent';
      state.currentPage = 1;
    },
  },
});

export const {
  addCategory,
  removeCategory,
  addFeatured,
  removeFeatured,
  setMinPrice,
  setMaxPrice,
  setSort,
  setCurrentPage,
  resetFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
