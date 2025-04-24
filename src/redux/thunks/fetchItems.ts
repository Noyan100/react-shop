import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TCurrentItems, TFetchItems, TItem } from "../types/types";
import api from "../../services/api";

export const fetchItems = createAsyncThunk(
  "users/fetchItems",
  async (params: TFetchItems) => {
    const { category, currentPage, featured, minPrice, maxPrice, sort } =
      params;

    // Fetch all products from the database
    const { data } = await api.get<TItem[]>("/products");

    // Apply filters
    const filteredData = data.filter((obj) => {
      const finalPrice = obj.cost - (obj.cost / 100) * obj.sale;

      return (
        (category.includes(obj.category) || category.length === 0) &&
        (featured.includes(obj.featured) || featured.length === 0) &&
        (finalPrice >= minPrice || minPrice === 0) &&
        (finalPrice <= maxPrice || maxPrice === 0)
      );
    });

    // Apply sorting
    const sortedData = filteredData.sort((a, b) => {
      const finalPriceA = a.cost - (a.cost / 100) * a.sale;
      const finalPriceB = b.cost - (b.cost / 100) * b.sale;

      switch (sort) {
        case "most price":
          return finalPriceB - finalPriceA;
        case "least price":
          return finalPriceA - finalPriceB;
        case "most rating":
          return b.rating - a.rating;
        case "least rating":
          return a.rating - b.rating;
        default:
          return finalPriceA - finalPriceB;
      }
    });

    return sortedData;
  }
);

const initialState = {
  items: [{}] as TItem[],
  status: "loading",
} as TCurrentItems;

const currentItems = createSlice({
  name: "currentitems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = "successful";
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.status = "error";
    });
    builder.addCase(fetchItems.pending, (state) => {
      state.status = "loading";
    });
  },
});

export default currentItems.reducer;
