import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFilterSlice } from '../types/types';

const initialState = {
  category: [],
  featured: [],
  minPrice: 0,
  maxPrice: 0,
  sort: 'most recent',
} as TFilterSlice;

const filterSlice = createSlice({
  name: 'filterSlice',
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<string>) {
      state.category = [...state.category, action.payload];
    },
    removeCategory(state, action: PayloadAction<string>) {
      state.category = state.category.filter((value) => value !== action.payload);
    },
    addFeatured(state, action: PayloadAction<string>) {
      state.featured = [...state.featured, action.payload];
    },
    removeFeatured(state, action: PayloadAction<string>) {
      state.featured = state.featured.filter((value) => value !== action.payload);
    },
    setMinPrice(state, action: PayloadAction<number>) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action: PayloadAction<number>) {
      state.maxPrice = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
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
} = filterSlice.actions;

export default filterSlice.reducer;
