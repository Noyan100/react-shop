import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import items from './thunks/fetchItems';
import cart from './slices/cartSlice';

export const store = configureStore({
  reducer: { filter, items, cart },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
