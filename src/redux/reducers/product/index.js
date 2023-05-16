import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productAPI from "../../../service/productAPI";

export const getAllProduct = createAsyncThunk("productAdmin/getAll", async (query, thunkAPI) => {
  try {
    const res = await productAPI.getAll(query);
    return res;
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const detailProduct = createAsyncThunk("productAdmin/detail", async (id, thunkAPI) => {
  try {
    const res = await productAPI.detail(id);
    return res;
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const addNewProduct = createAsyncThunk("productAdmin/addNew", async (data, thunkAPI) => {
  try {
    const res = await productAPI.addNew(data);
    return res;
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const updateProduct = createAsyncThunk("productAdmin/update", async (data, thunkAPI) => {
  try {
    const res = await productAPI.update(data);
    return res;
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

export const removeProduct = createAsyncThunk("productAdmin/remove", async (id, thunkAPI) => {
  try {
    const res = await productAPI.delete(id);
    return res;
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    isDetail: { status: false, info: {} },
    list: [],
    pages: 1,
    filter: { sort: "nac", page: 1 },
  },
  reducers: {
    getProductAll: (state, action) => {
      state.list = action.payload.list;
      state.pages = action.payload.pages;
    },
    getProductDetail: (state, action) => {
      state.isDetail = { status: true, info: action.payload.info };
    },
    addNew: (state, action) => {
      state.isDetail = { status: false, info: {} };
      state.list.push(action.payload.info);
    },
    update: (state, action) => {
      const { info, status } = action.payload;
      if (info) {
        const index = state.list.findIndex((item) => item._id === info._id);
        Object.keys(info).forEach((key) => (state.list[index][key] = info[key]));
        state.isDetail.info = info;
      }
      state.isDetail.status = status;
    },
    remove: (state, action) => {
      state.list = state.list.filter((product) => product._id !== action.payload.id);
      state.isDetail = { status: false, info: {} };
    },
    filterProductObj: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
  extraReducers: {
    [getAllProduct.fulfilled]: (state, action) => {
      state.list = action.payload.list;
      state.pages = action.payload.numberOfPages;
    },
    [detailProduct.fulfilled]: (state, action) => {
      state.isDetail = { status: true, info: action.payload };
    },
    [addNewProduct.fulfilled]: (state, action) => {
      state.isDetail = { status: false, info: {} };
      state.list.push(action.payload);
    },
    [updateProduct.fulfilled]: (state, action) => {
      const info = action.payload;
      const index = state.list.findIndex((item) => item._id === info._id);
      Object.keys(info).forEach((key) => (state.list[index][key] = info[key]));
      state.isDetail.info = info;
    },
    [removeProduct.fulfilled]: (state, action) => {
      state.list = state.list.filter((product) => product._id !== action.payload._id);
      state.isDetail = { status: false, info: {} };
    },
  },
});

export default productsSlice;
