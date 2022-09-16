import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalCount } from '../../utils/calcTotalCount';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { TCartSlice, TCartItem } from '../types/types';

const initialState = getCartFromLS() as TCartSlice;

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    plusItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find((obj) => obj.cartid === action.payload.cartid);

      if (findItem) {
        findItem.count++;
      }
      state.totalCount = calcTotalCount(state.items);
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find((obj) => obj.cartid === action.payload.cartid);

      if (findItem) {
        findItem.count--;
      }
      state.totalCount = calcTotalCount(state.items);
      state.totalPrice = calcTotalPrice(state.items);
    },
    addItem(state, action: PayloadAction<TCartItem>) {
      const findItem = state.items.find((obj) => obj.cartid === action.payload.cartid);
      if (findItem) {
        findItem.count++;
      } else {
        state.items = [...state.items, action.payload];
      }
      state.totalCount = calcTotalCount(state.items);
      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItem(state, action: PayloadAction<TCartItem>) {
      state.items = state.items.filter((obj) => obj.cartid !== action.payload.cartid);
      state.totalCount = calcTotalCount(state.items);
      state.totalPrice = calcTotalPrice(state.items);
    },
  },
});

export const { plusItem, minusItem, addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
