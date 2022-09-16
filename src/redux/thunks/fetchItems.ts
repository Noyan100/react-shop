import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { TCurrentItems, TFetchItems, TItem } from '../types/types';

export const fetchItems = createAsyncThunk('users/fetchItems', async (params: TFetchItems) => {
  const { category, currentPage, featured, minPrice, maxPrice, sort } = params;
  const { data } = await axios.get<TItem[]>(`https://62f37628a84d8c968123bc84.mockapi.io/items`);
  const filteredData = data.filter((obj, index) => {
    if (
      (category.includes(obj.category) || category.length === 0) &&
      (featured.includes(obj.featured) || featured.length === 0) &&
      (obj.cost - (obj.cost / 100) * obj.sale >= minPrice || minPrice === 0) &&
      (obj.cost - (obj.cost / 100) * obj.sale <= maxPrice || maxPrice === 0)
    )
      return obj;
  });
  const sortedData = filteredData.sort(function (a, b) {
    switch (sort) {
      case 'most price':
        if (a.cost - (a.cost / 100) * a.sale > b.cost - (b.cost / 100) * b.sale) {
          return -1;
        }
        if (a.cost - (a.cost / 100) * a.sale < b.cost - (b.cost / 100) * b.sale) {
          return 1;
        }
        return 0;

      case 'least price':
        if (a.cost - (a.cost / 100) * a.sale > b.cost - (b.cost / 100) * b.sale) {
          return 1;
        }
        if (a.cost - (a.cost / 100) * a.sale < b.cost - (b.cost / 100) * b.sale) {
          return -1;
        }
        return 0;
      case 'most rating':
        if (a.rating > b.rating) {
          return -1;
        }
        if (a.rating < b.rating) {
          return 1;
        }
        return 0;

      case 'least rating':
        if (a.rating > b.rating) {
          return 1;
        }
        if (a.rating < b.rating) {
          return -1;
        }
        return 0;

      default:
        if (a.cost - (a.cost / 100) * a.sale > b.cost - (b.cost / 100) * b.sale) {
          return 1;
        }
        if (a.cost - (a.cost / 100) * a.sale < b.cost - (b.cost / 100) * b.sale) {
          return -1;
        }
        return 0;
    }
  });
  return sortedData;
});

const initialState = {
  items: [{}] as TItem[],
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
