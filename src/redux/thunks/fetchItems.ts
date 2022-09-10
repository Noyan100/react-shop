import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { TCurrentItems } from '../types/types';

export const fetchItems = createAsyncThunk('users/fetchItems', async () => {
  const response = await axios.get(`https://62f37628a84d8c968123bc84.mockapi.io/items`);
  return response.data;
});

const initialState = {
  items: [{}],
  status: 'loading',
} as TCurrentItems;

const currentItems = createSlice({
  name: 'currentitems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'successful';
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.status = 'error';
    });
    builder.addCase(fetchItems.pending, (state) => {
      state.status = 'loading';
    });
  },
});

export default currentItems.reducer;
