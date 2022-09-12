import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import items from './thunks/fetchItems';

export const store = configureStore({
  reducer: { filter, items },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
