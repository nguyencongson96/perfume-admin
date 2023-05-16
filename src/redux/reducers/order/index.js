import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderAPI from "../../../service/orderAPI";

export const getAllOrders = createAsyncThunk("orderAdmin/getAll", async (query, thunkAPI) => {
  try {
    const res = await orderAPI.filter(query);
    return res;
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const getOrderDetail = createAsyncThunk("orderAdmin/getDetail", async (id, thunkAPI) => {
  try {
    const res = await orderAPI.detail(id);
    return res;
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const getOrderUpdate = createAsyncThunk("orderAdmin/getOrderUpdate", async (order, thunkAPI) => {
  try {
    const res = await orderAPI.update(order._id, order);
    return res;
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    list: [],
    pages: 1,
    filter: { page: 1 },
    detail: {},
  },
  reducers: {
    getOrdersAll: (state, action) => {
      const { list, pages } = action.payload;
      list && (state.list = list);
      pages && (state.pages = pages);
    },
    getDetailOrder: (state, action) => {
      state.detail = action.payload;
    },
    updateOrder: (state, action) => {
      const index = state.list.findIndex((item) => item._id === action.payload._id);
      state.list.splice(index, 1, action.payload);
    },
    filterOrderObj: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
  extraReducers: {
    [getAllOrders.fulfilled]: (state, action) => {
      const { list, numberOfPages } = action.payload;
      list && (state.list = list);
      numberOfPages && (state.pages = numberOfPages);
    },
    [getOrderDetail.fulfilled]: (state, action) => {
      state.detail = action.payload;
    },
    [getOrderUpdate.fulfilled]: (state, action) => {
      const index = state.list.findIndex((item) => item._id === action.payload._id);
      state.list.splice(index, 1, action.payload);
    },
  },
});

export default ordersSlice;
